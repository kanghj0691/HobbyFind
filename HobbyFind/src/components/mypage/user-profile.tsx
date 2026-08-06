'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bookmark, Mail, User } from 'lucide-react';

interface UserProfileProps {
  name?: string | null;
  email?: string | null;
  bookmarkCount?: number;
}

export function UserProfile({ name, email, bookmarkCount = 0 }: UserProfileProps) {
  const getInitials = (value: string) =>
    value
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const displayName = name || '사용자';
  const initials = name ? getInitials(name) : email?.charAt(0).toUpperCase() || 'U';

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="flex items-center gap-4 p-6">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-description" />
            <h2 className="text-xl font-semibold text-title">{displayName}</h2>
          </div>
          {email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-description" />
              <span className="text-sm text-body">{email}</span>
            </div>
          )}
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-2xl font-bold text-primary">
            <Bookmark className="h-5 w-5 fill-current" />
            {bookmarkCount}
          </div>
          <div className="text-sm text-description">북마크</div>
        </div>
      </CardContent>
    </Card>
  );
}
