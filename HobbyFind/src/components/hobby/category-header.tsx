'use client';

import { motion } from 'framer-motion';

interface CategoryHeaderProps {
  name: string;
  description: string;
}

export function CategoryHeader({ name, description }: CategoryHeaderProps) {
  return (
    <section className="border-b border-border bg-background py-16 text-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="text-4xl font-bold text-title sm:text-5xl"
        >
          {name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15, ease: 'easeOut' }}
          className="mx-auto mt-4 max-w-2xl text-lg text-description"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
