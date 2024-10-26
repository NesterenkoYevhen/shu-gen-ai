import cn from 'classnames';

import { useTranslations } from 'next-intl';

import { Typography, TypographyVariants } from '@/shared/ui-kit/Typography';

import styles from './ToolsGrid.module.scss';

type ToolCardProps = {
  index: number;
  title: string;
  description: string;
  className: string;
};

const tools = [
  { title: 'tools-grid.pdf-title', description: 'tools-grid.pdf-description', className: styles.gridPdf },
  { title: 'tools-grid.image-title', description: 'tools-grid.image-description', className: styles.gridImage },
  { title: 'tools-grid.video-title', description: 'tools-grid.video-description', className: styles.gridVideo },
  { title: 'tools-grid.ai-title', description: 'tools-grid.ai-description', className: styles.gridAi },
  { title: 'tools-grid.file-title', description: 'tools-grid.file-description', className: styles.gridFile },
];

const ToolCard = ({
  index, title, description, className,
}: ToolCardProps) => {
  const t = useTranslations('main-page');

  return (
    <li
      className={cn(
        'sm:h-[243px] flex flex-row gap-6 sm:gap-0 sm:flex-col justify-between p-6 rounded-2xl border border-solid border-neutralsGrey300-light dark:border-neutralsGrey300-dark',
        className,
      )}
    >
      <Typography variant={TypographyVariants.TITLE_2} className="text-additionalGrey300-light dark:text-additionalGrey300-dark">
        {index}
        /
      </Typography>
      <div>
        <Typography variant={TypographyVariants.TITLE_3} className="!text-lg sm:!text-2xl">{t(title)}</Typography>
        <Typography
          variant={TypographyVariants.SECONDARY}
          className="mt-2 text-neutralsGrey600-light dark:text-neutralsGrey600-dark"
        >
          {t(description)}
        </Typography>
      </div>
    </li>
  );
};

export const ToolsGrid = () => (
  <ul className={styles.gridTools}>
    {tools.map((tool, index) => (
      <ToolCard
        key={tool.title}
        index={index + 1}
        title={tool.title}
        description={tool.description}
        className={tool.className}
      />
    ))}
  </ul>
);
