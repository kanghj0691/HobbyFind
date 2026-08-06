'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { FILTER_CATEGORIES } from '@/constants/categories';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  enableNavigation?: boolean;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  enableNavigation = false,
}: CategoryFilterProps) {
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    if (enableNavigation) {
      if (categoryId === 'all') {
        router.push('/');
      } else {
        router.push(`/category/${categoryId}`);
      }
      return;
    }
    onCategoryChange(categoryId);
  };

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex justify-center gap-4 min-w-max px-4 sm:px-0">
        {FILTER_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryClick(category.id)}
              className={cn(
                'rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer',
                isSelected
                  ? 'border-black bg-black text-white'
                  : 'border-border bg-white text-body hover:bg-gray-100'
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
