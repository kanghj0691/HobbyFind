'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Topbar } from '@/components/layout/topbar';
import { Footer } from '@/components/layout/footer';
import { MypageHeader } from '@/components/mypage/mypage-header';
import { UserProfile } from '@/components/mypage/user-profile';
import { BookmarkList } from '@/components/mypage/bookmark-list';
import { CategoryStats } from '@/components/mypage/category-stats';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import type { BookmarkedHobby } from '@/lib/bookmark-utils';

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [bookmarkedHobbies, setBookmarkedHobbies] = useState<BookmarkedHobby[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [totalCount, setTotalCount] = useState(0);

  const loadBookmarkData = useCallback(async () => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    try {
      const [bookmarksResponse, statsResponse] = await Promise.all([
        fetch('/api/bookmarks'),
        fetch('/api/bookmarks/stats'),
      ]);

      if (bookmarksResponse.ok) {
        const bookmarksData = await bookmarksResponse.json();
        setBookmarkedHobbies(bookmarksData.data);
      }

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.data.stats);
        setTotalCount(statsData.data.totalCount);
      }
    } catch {
      toast({
        title: '데이터 로드 실패',
        description: '북마크 데이터를 불러올 수 없습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id, toast]);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
      return;
    }

    loadBookmarkData();
  }, [session, status, router, loadBookmarkData]);

  const handleBookmarkRemove = async (hobbyId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/bookmarks/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hobbyId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const removedHobby = bookmarkedHobbies.find((hobby) => hobby.id === hobbyId);

      setBookmarkedHobbies((prev) => prev.filter((hobby) => hobby.id !== hobbyId));
      setTotalCount((prev) => prev - 1);

      if (removedHobby) {
        setStats((prev) => ({
          ...prev,
          [removedHobby.category]: Math.max(0, (prev[removedHobby.category] || 0) - 1),
        }));
      }

      toast({
        title: '북마크 제거됨',
        description: '북마크에서 제거했습니다.',
      });
    } catch (error) {
      toast({
        title: '오류가 발생했습니다',
        description:
          error instanceof Error ? error.message : '북마크를 제거할 수 없습니다. 다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Topbar />
        <main className="flex-1 py-16">
          <div className="mx-auto max-w-7xl animate-pulse px-4 sm:px-6 lg:px-8">
            <div className="mb-8 h-10 w-1/3 rounded bg-muted" />
            <div className="mb-8 h-24 rounded-2xl bg-muted" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-64 rounded-2xl bg-muted" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Topbar />

      <MypageHeader userName={session.user?.name} />

      <main className="flex-1 py-16">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <UserProfile
            name={session.user?.name}
            email={session.user?.email}
            bookmarkCount={totalCount}
          />

          <section>
            <BookmarkList
              hobbies={bookmarkedHobbies}
              onBookmarkRemove={handleBookmarkRemove}
              isLoading={isLoading}
            />
          </section>

          <section>
            <CategoryStats stats={stats} totalCount={totalCount} />
          </section>
        </div>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}
