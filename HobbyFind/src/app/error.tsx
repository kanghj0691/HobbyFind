'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="mb-2 text-2xl font-bold text-title">문제가 발생했습니다</h1>
      <p className="mb-6 max-w-md text-description">
        페이지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <Button onClick={reset} className="bg-primary text-primary-foreground hover:bg-primary-hover">
        다시 시도
      </Button>
    </div>
  );
}
