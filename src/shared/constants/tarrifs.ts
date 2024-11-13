import { Tarrif } from '../types/common';

export const tarrifs: Tarrif[] = [
  {
    api_id: 1,
    id: 'FREE',
    label: 'main-page.plans.free-plan.title',
    price: '$0.00',
    duration: 3,
    api_label: 'trial',
  },
  {
    api_id: 2,
    id: 'PRO',
    label: 'main-page.plans.pro-plan.title',
    price: '$5.00',
    duration: 30,
    api_label: 'advanced',
  },
  {
    api_id: 3,
    id: 'PRO+',
    label: 'main-page.plans.pro-plus-plan.title',
    price: '$10.00',
    duration: 30,
    api_label: 'pro',
  },
];
