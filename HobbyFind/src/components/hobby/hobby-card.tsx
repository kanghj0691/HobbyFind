'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { CATEGORY_LABELS } from '@/constants/categories';
import { getHobbyThumbnailUrl } from '@/lib/data/thumbnails';
import type { Hobby } from '@/lib/data/hobbies';

type HobbyCardProps = Hobby;

export function HobbyCard({
  id,
  title,
  description,
  category,
}: HobbyCardProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(`/api/bookmarks/check?hobbyId=${id}`);
        if (response.ok) {
          const data = await response.json();
          setBookmarked(data.isBookmarked);
        }
      } catch {
        // 북마크 상태 조회 실패는 UI에 표시하지 않음
      }
    };

    checkBookmarkStatus();
  }, [id, session?.user?.id]);

  const handleBookmarkClick = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/bookmarks/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hobbyId: id }),
      });

      if (response.ok) {
        const data = await response.json();
        setBookmarked(data.isBookmarked);
        toast({
          title: data.isBookmarked ? '북마크 추가됨' : '북마크 해제됨',
          description: data.message,
        });
        return;
      }

      const errorData = await response.json();
      throw new Error(errorData.message);
    } catch (error) {
      toast({
        title: '오류가 발생했습니다',
        description:
          error instanceof Error
            ? error.message
            : '북마크 상태를 변경할 수 없습니다. 다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="group overflow-hidden rounded-2xl border shadow-sm transition duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg">
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={getHobbyThumbnailUrl(id)}
          alt={title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute left-3 top-3 z-10">
          <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-body">
            {CATEGORY_LABELS[category]}
          </span>
        </div>
        {session && (
          <Button
            variant="ghost"
            size="sm"
            className={`absolute right-3 top-3 z-10 h-11 w-11 rounded-full p-0 transition-all duration-200 ${
              bookmarked
                ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
                : 'bg-white/90 text-body hover:bg-white'
            }`}
            onClick={handleBookmarkClick}
            disabled={isLoading}
            aria-label={bookmarked ? '북마크 해제' : '북마크 추가'}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
          </Button>
        )}
        {!session && (
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="absolute right-3 top-3 z-10 h-11 w-11 rounded-full bg-white/90 p-0 text-body hover:bg-white"
          >
            <Link href="/login" aria-label="로그인하여 북마크">
              <Bookmark className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-title">{title}</h3>
        <p className="line-clamp-3 text-sm text-description">{description}</p>
      </CardContent>
    </Card>
  );
}
