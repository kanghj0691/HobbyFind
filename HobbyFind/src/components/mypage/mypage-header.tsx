'use client';

import { motion } from 'framer-motion';

interface MypageHeaderProps {
  userName?: string | null;
}

export function MypageHeader({ userName }: MypageHeaderProps) {
  return (
    <section className="border-b border-border bg-background py-16 text-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="text-4xl font-bold text-title sm:text-5xl"
        >
          내가 저장한 취미
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15, ease: 'easeOut' }}
          className="mt-4 text-lg text-description"
        >
          {userName ? `${userName}님의 북마크 목록과 통계입니다.` : '북마크 목록과 통계를 확인하세요.'}
        </motion.p>
      </div>
    </section>
  );
}
