import { createClient } from './supabase/server';
import { getHobbyById, isValidHobbyId } from './data/hobbies';
import { getHobbyThumbnailUrl } from './data/thumbnails';

export interface Bookmark {
  id: string;
  user_id: string;
  hobby_id: string;
  created_at: string;
  updated_at?: string;
}

export interface BookmarkedHobby {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'sports' | 'intelligence' | 'art';
  bookmarkedAt: string;
}

function mapSupabaseError(error: { code?: string; message?: string }, fallback: string): Error {
  if (
    error.code === '42P01' ||
    error.message?.includes('schema cache') ||
    error.message?.includes('Could not find the table')
  ) {
    return new Error(
      '북마크 테이블이 없습니다. Supabase SQL Editor에서 migration SQL을 실행해주세요.'
    );
  }

  if (error.code === '23503') {
    return new Error('사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
  }

  return new Error(fallback);
}

function assertValidHobbyId(hobbyId: string): void {
  if (!isValidHobbyId(hobbyId)) {
    throw new Error('유효하지 않은 취미 ID입니다.');
  }
}

export async function getUserBookmarks(userId: string): Promise<Bookmark[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching user bookmarks:', error);
    }
    throw mapSupabaseError(error, '북마크 목록을 불러올 수 없습니다.');
  }

  return data || [];
}

export async function addBookmark(userId: string, hobbyId: string): Promise<Bookmark> {
  assertValidHobbyId(hobbyId);

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('bookmarks')
    .insert({
      user_id: userId,
      hobby_id: hobbyId,
    })
    .select()
    .single();

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error adding bookmark:', error);
    }
    if (error.code === '23505') {
      throw new Error('이미 북마크된 취미입니다.');
    }
    throw mapSupabaseError(error, '북마크를 추가할 수 없습니다.');
  }

  return data;
}

export async function removeBookmark(userId: string, hobbyId: string): Promise<void> {
  assertValidHobbyId(hobbyId);

  const supabase = await createClient();

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', userId)
    .eq('hobby_id', hobbyId);

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error removing bookmark:', error);
    }
    throw mapSupabaseError(error, '북마크를 제거할 수 없습니다.');
  }
}

export async function isBookmarked(userId: string, hobbyId: string): Promise<boolean> {
  if (!isValidHobbyId(hobbyId)) {
    return false;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', userId)
    .eq('hobby_id', hobbyId)
    .maybeSingle();

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error checking bookmark status:', error);
    }
    throw mapSupabaseError(error, '북마크 상태를 확인할 수 없습니다.');
  }

  return !!data;
}

export async function toggleBookmark(userId: string, hobbyId: string): Promise<boolean> {
  const isCurrentlyBookmarked = await isBookmarked(userId, hobbyId);

  if (isCurrentlyBookmarked) {
    await removeBookmark(userId, hobbyId);
    return false;
  }

  await addBookmark(userId, hobbyId);
  return true;
}

export async function getBookmarkedHobbiesWithDetails(userId: string): Promise<BookmarkedHobby[]> {
  const bookmarks = await getUserBookmarks(userId);

  return bookmarks.map((bookmark) => {
    const hobby = getHobbyById(bookmark.hobby_id);
    if (!hobby) {
      throw new Error(`취미 정보를 찾을 수 없습니다: ${bookmark.hobby_id}`);
    }

    return {
      id: hobby.id,
      title: hobby.title,
      description: hobby.description,
      imageUrl: getHobbyThumbnailUrl(hobby.id),
      category: hobby.category,
      bookmarkedAt: bookmark.created_at,
    };
  });
}

export async function getBookmarkStats(userId: string): Promise<Record<string, number>> {
  const bookmarkedHobbies = await getBookmarkedHobbiesWithDetails(userId);

  return bookmarkedHobbies.reduce(
    (acc, hobby) => {
      acc[hobby.category] = (acc[hobby.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
}
