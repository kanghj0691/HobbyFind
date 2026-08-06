'use client';

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Trash2, Calendar } from 'lucide-react';
import { CATEGORIES, CATEGORY_LABELS, type CategoryId } from '@/constants/categories';
import { getHobbyThumbnailUrl } from '@/lib/data/thumbnails';
import type { BookmarkedHobby } from '@/lib/bookmark-utils';

interface BookmarkListProps {
  hobbies: BookmarkedHobby[];
  onBookmarkRemove: (hobbyId: string) => void;
  isLoading: boolean;
}

export function BookmarkList({ hobbies, onBookmarkRemove, isLoading }: BookmarkListProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'yyyy년 M월 d일', { locale: ko });
    } catch {
      return dateString;
    }
  };

  if (hobbies.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 py-16 text-center">
        <Bookmark className="mx-auto mb-4 h-12 w-12 text-description" />
        <h3 className="mb-2 text-xl font-semibold text-title">아직 북마크한 취미가 없습니다</h3>
        <p className="mb-6 text-description">관심 있는 취미를 북마크하면 여기서 확인할 수 있습니다.</p>
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-hover">
          <Link href="/">취미 탐색하기</Link>
        </Button>
      </div>
    );
  }

  const grouped = CATEGORIES.map((category) => ({
    ...category,
    hobbies: hobbies.filter((hobby) => hobby.category === category.id),
  })).filter((group) => group.hobbies.length > 0);

  return (
    <div className="space-y-10">
      {grouped.map((group) => (
        <section key={group.id}>
          <h2 className="mb-6 text-2xl font-bold text-title">{group.name}</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {group.hobbies.map((hobby) => (
              <Card
                key={hobby.id}
                className="group overflow-hidden rounded-2xl border shadow-sm transition duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={getHobbyThumbnailUrl(hobby.id)}
                    alt={hobby.title}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute left-3 top-3 z-10">
                    <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-body">
                      {CATEGORY_LABELS[hobby.category as CategoryId]}
                    </span>
                  </div>
                  <div className="absolute right-3 top-3 z-10 flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-11 w-11 rounded-full bg-primary p-0 text-primary-foreground"
                      disabled
                      aria-label="북마크됨"
                    >
                      <Bookmark className="h-4 w-4 fill-current" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-11 w-11 rounded-full bg-white/90 p-0 text-destructive hover:bg-white"
                      onClick={() => onBookmarkRemove(hobby.id)}
                      disabled={isLoading}
                      aria-label="북마크 제거"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs text-description">
                    <Calendar className="h-3 w-3" />
                    <span>북마크: {formatDate(hobby.bookmarkedAt)}</span>
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-title">{hobby.title}</h3>
                  <p className="line-clamp-3 text-sm text-description">{hobby.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
