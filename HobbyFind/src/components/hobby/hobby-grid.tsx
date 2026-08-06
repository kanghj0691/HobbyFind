'use client';

import { HobbyCard } from './hobby-card';
import type { Hobby } from '@/lib/data/hobbies';

interface HobbyGridProps {
  hobbies: Hobby[];
  selectedCategory: string;
}

export function HobbyGrid({ hobbies, selectedCategory }: HobbyGridProps) {
  const filteredHobbies =
    selectedCategory === 'all'
      ? hobbies
      : hobbies.filter((hobby) => hobby.category === selectedCategory);

  if (filteredHobbies.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="mb-2 text-lg font-medium text-title">
          {selectedCategory !== 'all'
            ? '해당 카테고리의 취미가 없습니다'
            : '취미를 찾을 수 없습니다'}
        </h3>
        <p className="text-description">
          {selectedCategory !== 'all'
            ? '다른 카테고리를 선택해보세요.'
            : '잠시 후 다시 시도해주세요.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredHobbies.map((hobby) => (
        <HobbyCard key={hobby.id} {...hobby} />
      ))}
    </div>
  );
}
