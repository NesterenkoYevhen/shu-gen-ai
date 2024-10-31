'use client';

import { useRef, useState } from 'react';
import cn from 'classnames';
import Highlighter from 'react-highlight-words';

import { all } from '@/shared/constants/tools';

import { useTranslations } from 'next-intl';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import SearchLight from '@/assets/icons/search-light.svg';
import SearchDark from '@/assets/icons/search-dark.svg';

import { LocaleLink } from '../LocaleNavigation';

export const Search = () => {
  const t = useTranslations();
  const searchRef = useRef<HTMLDivElement>(null);
  const [isSearchResult, setIsSearchResut] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  useClickOutside(searchRef, setIsSearchResut, false);

  const translatedFeatures = all.map(({ label, ...rest }) => ({
    ...rest,
    translatedLabel: t(`features.${label}.name`),
  }));

  const searchResults = translatedFeatures.filter(({ translatedLabel }) => translatedLabel.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2);

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex bg-neutralsGrey100-light dark:bg-neutralsGrey100-dark rounded-2xl w-[254px] xl:w-[220px] gap-2 items-center py-3 px-4">
        <label htmlFor="search">
          <SearchLight className="block dark:hidden" />
          <SearchDark className="hidden dark:block" />
        </label>

        <input
          id="search"
          type="text"
          className="outline-none bg-transparent w-[90%]"
          placeholder={t('search.placeholder')}
          onFocus={() => setIsSearchResut(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isSearchResult && searchQuery && (
        <ul
          className={cn(
            'absolute left-0 top-[55px] py-4 px-6 rounded-2xl border border-solid border-grey1-light dark:border-none bg-background-light dark:bg-additionalGrey400-dark w-[254px] transition-all duration-300 transform opacity-100 scale-100 z-50',
          )}
        >
          {searchResults.map(({ Icon, translatedLabel, route }) => (
            <LocaleLink href={route} key={translatedLabel}>
              <li className="py-3.5 border-b border-solid border-grey1-light dark:border-grey1-dark w-full cursor-pointer flex items-center gap-2">
                <Icon className="text-2xl" />
                <Typography variant={TypographyVariants.MAIN}>
                  <Highlighter
                    highlightClassName="text-secondaryGreen-light"
                    searchWords={[searchQuery]}
                    autoEscape
                    textToHighlight={translatedLabel}
                  />
                </Typography>
              </li>
            </LocaleLink>
          ))}

          <LocaleLink
            href="/search"
            onClick={() => {
              setIsSearchResut(false);
              setSearchQuery('');
            }}
          >
            <li className={cn('w-full cursor-pointer text-secondaryGreen-light', {
              'pt-0': searchResults.length === 0,
              'pt-3.5': searchResults.length > 0,
            })}
            >
              <Typography variant={TypographyVariants.MAIN} fontWeight="bold">
                {t('search.all-tools')}
              </Typography>
            </li>
          </LocaleLink>

        </ul>
      )}
    </div>
  );
};
