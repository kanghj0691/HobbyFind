'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Heart, LogOut, Menu, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { CATEGORIES } from '@/constants/categories';
import { cn } from '@/lib/utils';

export function Topbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast({
        title: '로그아웃 완료',
        description: '안전하게 로그아웃되었습니다.',
      });
      router.push('/');
      router.refresh();
    } catch {
      toast({
        title: '로그아웃 실패',
        description: '로그아웃 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-border bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold text-title">HobbyFind</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={cn(
                'text-sm font-medium transition-colors duration-200',
                pathname === category.href
                  ? 'text-title'
                  : 'text-body hover:text-title'
              )}
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {status === 'loading' ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
          ) : session ? (
            <>
              <Button variant="ghost" asChild className="text-body hover:bg-muted">
                <Link href="/mypage">마이페이지</Link>
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2 border-border text-body"
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-body hover:bg-muted">
                <Link href="/login">로그인</Link>
              </Button>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-hover">
                <Link href="/signup">회원가입</Link>
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-body">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {CATEGORIES.map((category) => (
                <DropdownMenuItem key={category.id} asChild>
                  <Link href={category.href}>{category.name}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {status === 'loading' ? (
                <DropdownMenuItem disabled>
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                </DropdownMenuItem>
              ) : session ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/mypage" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      마이페이지
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    로그아웃
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">로그인</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/signup">회원가입</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
