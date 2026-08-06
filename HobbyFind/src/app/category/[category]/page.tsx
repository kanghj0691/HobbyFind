'use client';

import { useParams, notFound } from 'next/navigation';
import { Topbar } from '@/components/layout/topbar';
import { Footer } from '@/components/layout/footer';
import { CategoryHeader } from '@/components/hobby/category-header';
import { CategoryFilter } from '@/components/hobby/category-filter';
import { HobbyGrid } from '@/components/hobby/hobby-grid';
import { getHobbiesByCategory } from '@/lib/data/hobbies';
import { CATEGORY_INFO, isCategoryId } from '@/constants/categories';
import { Toaster } from '@/components/ui/toaster';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  if (!isCategoryId(category)) {
    notFound();
  }

  const { name, description } = CATEGORY_INFO[category];
  const categoryHobbies = getHobbiesByCategory(category);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Topbar />

      <CategoryHeader name={name} description={description} />

      <main className="flex-1 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="mb-12">
            <CategoryFilter
              selectedCategory={category}
              onCategoryChange={() => {}}
              enableNavigation
            />
          </section>

          <section>
            <HobbyGrid hobbies={categoryHobbies} selectedCategory={category} />
          </section>
        </div>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}
