import { FC } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslations } from 'next-intl';

import { Feature } from '@/shared/types/common';

import { LocaleLink } from '@/features/LocaleNavigation';
import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

interface IFeatureItem extends Feature {
  translatedLabel: string;
  translatedDescription: string;
  searchQuery: string;
}

export const FeatureItem: FC<IFeatureItem> = ({
  label, route, Icon, translatedLabel, translatedDescription, searchQuery,
}) => {
  const t = useTranslations('features');
  return (
    <li className="p-6 rounded-lg bg-additionalGrey100-light dark:bg-additionalGrey100-dark">
      <LocaleLink href={route}>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-secondaryPurple-light dark:bg-secondaryPurple-dark flex justify-center items-center">
            <Icon className="text-xl text-neutralsGrey800-light dark:text-neutralsGrey800-dark" />
          </div>
          <div>
            <Typography variant={TypographyVariants.TITLE_5}>
              <Highlighter
                highlightClassName="text-secondaryGreen-light"
                searchWords={[searchQuery]}
                autoEscape
                textToHighlight={translatedLabel}
              />
            </Typography>
            <Typography
              variant={TypographyVariants.SECONDARY}
              className="mt-1 text-neutralsGrey600-light dark:text-neutralsGrey600-dark"
            >
              {t(`${label.split('.')[0]}.category`)}
            </Typography>
          </div>
        </div>
        <Typography
          variant={TypographyVariants.SECONDARY}
          className="mt-2 text-neutralsGrey600-light dark:text-neutralsGrey600-dark"
        >
          <Highlighter
            highlightClassName="text-secondaryGreen-light"
            searchWords={[searchQuery]}
            autoEscape
            textToHighlight={translatedDescription}
          />
        </Typography>
      </LocaleLink>
    </li>

  );
};
