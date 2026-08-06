import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="mb-2 text-2xl font-bold text-title">페이지를 찾을 수 없습니다</h1>
      <p className="mb-6 max-w-md text-description">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-hover">
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
