'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { all } from '@/shared/constants/tools';

import SearchLight from '@/assets/icons/search-light.svg';
import SearchDark from '@/assets/icons/search-dark.svg';

import { Container } from '@/shared/ui-kit/Container';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';
import { FeaturesList } from './FeaturesList/FeaturesList';

export const SearchView = () => {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');

  const translatedFeatures = all.map(({ label, ...rest }) => ({
    ...rest,
    label,
    translatedLabel: t(`features.${label}.name`),
    translatedDescription: t(`features.${label}.description`),
  }));

  const searchResults = translatedFeatures.filter(({ translatedLabel, translatedDescription }) => translatedLabel.toLowerCase().includes(searchQuery.toLowerCase()) || translatedDescription.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Container>
      <section className="mt-20">
        <Typography variant={TypographyVariants.TITLE_1}>{t('search-page.title')}</Typography>
        <Typography variant={TypographyVariants.MAIN} className="mt-2 text-neutralsGrey600-light dark:text-neutralsGrey600-dark">{t('search-page.description')}</Typography>

        <div className="mt-6 flex bg-neutralsGrey100-light dark:bg-neutralsGrey100-dark rounded-2xl w-full xl:w-[405px] gap-2 items-center p-4">
          <label htmlFor="search-main">
            <SearchLight className="block dark:hidden" />
            <SearchDark className="hidden dark:block" />
          </label>

          <input
            id="search-main"
            type="text"
            className="outline-none bg-transparent w-[90%]"
            placeholder={t('search-page.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>
      <section className="mt-16 sm:mt-20">
        <FeaturesList features={searchResults} searchQuery={searchQuery} />
      </section>
    </Container>
  );
};
