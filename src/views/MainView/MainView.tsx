import { Container } from '@/shared/ui-kit/Container';

import { Ticker } from '@/features/Ticker';

import { Suspense } from 'react';
import { Loader } from '@/shared/ui-kit/Loader';
import { LoaderBlock } from '@/shared/ui-kit/LoaderBlock';
import { RecentTools } from './RecentTools';
import { Statistics } from './Statistics';
import { ToolsGrid } from './ToolsGrid';
import { Hero } from './Hero/Hero';
import { SliderTools } from './SliderTools';
import { Plans } from './Plans';
import { Tabs } from './Tabs';

export const MainView = () => (
  <main className="w-full mt-4">
    <Container>
      <Suspense fallback={<LoaderBlock />}>
        <RecentTools />
      </Suspense>

      <section className="mt-[98px]">
        <Hero />
      </section>

      <section className="mt-[128px] sm:mt-[158px]">
        <ToolsGrid />
      </section>

    </Container>

    <section className="mt-20">
      <Ticker />
    </section>

    <Container>
      <section className="mt-20 sm:mt-32">
        <Suspense fallback={<Loader />}>
          <Statistics />
        </Suspense>

      </section>

      <section className="mt-[94px] sm:mt-[130px]">
        <SliderTools />
      </section>

      <section className="mt-[99px] sm:mt-[127px]">
        <Plans />
      </section>

      <section className="mt-[69px] sm:mt-[95px]">
        <Tabs />
      </section>
    </Container>

  </main>
);
