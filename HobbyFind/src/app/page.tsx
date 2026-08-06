'use client';

import { useState } from 'react';
import { Topbar } from '@/components/layout/topbar';
import { HeroSection } from '@/components/layout/hero-section';
import { Footer } from '@/components/layout/footer';
import { CategoryFilter } from '@/components/hobby/category-filter';
import { HobbyGrid } from '@/components/hobby/hobby-grid';
import { hobbies } from '@/lib/data/hobbies';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Topbar />

      <HeroSection />

      <main id="hobbies" className="flex-1 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="mb-12">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </section>

          <section>
            <HobbyGrid hobbies={hobbies} selectedCategory={selectedCategory} />
          </section>
        </div>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}
