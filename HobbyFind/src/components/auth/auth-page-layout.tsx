'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Topbar } from '@/components/layout/topbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerLink: {
    label: string;
    href: string;
    linkText: string;
  };
}

export function AuthPageLayout({
  title,
  description,
  children,
  footerLink,
}: AuthPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Topbar />

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-title">HobbyFind</span>
            </Link>
          </div>

          <Card className="rounded-2xl border shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-title">{title}</CardTitle>
              <CardDescription className="text-description">{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-description">
            {footerLink.label}{' '}
            <Link href={footerLink.href} className="font-medium text-primary hover:underline">
              {footerLink.linkText}
            </Link>
          </p>
        </div>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}
