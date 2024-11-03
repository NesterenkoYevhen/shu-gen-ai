import { FaCity, FaUmbrellaBeach, FaWater } from 'react-icons/fa';
import { GiDesert, GiForestEntrance } from 'react-icons/gi';
import { LiaHaykalSolid } from 'react-icons/lia';
import { MdForest } from 'react-icons/md';
import { FaMountainSun } from 'react-icons/fa6';
import { PiMountainsFill } from 'react-icons/pi';
import { HiOfficeBuilding } from 'react-icons/hi';
import { Background } from '../types/common';

export const backgrounds: Background[] = [
  {
    id: 1,
    label: 'backgrounds.city',
    Icon: FaCity,
  },
  {
    id: 2,
    label: 'backgrounds.beach',
    Icon: FaUmbrellaBeach,
  },
  {
    id: 3,
    label: 'backgrounds.desert',
    Icon: GiDesert,
  },
  {
    id: 4,
    label: 'backgrounds.field',
    Icon: LiaHaykalSolid,
  },
  {
    id: 5,
    label: 'backgrounds.forest-autumn',
    Icon: MdForest,
  },
  {
    id: 6,
    label: 'backgrounds.forest',
    Icon: GiForestEntrance,
  },
  {
    id: 7,
    label: 'backgrounds.mountains',
    Icon: FaMountainSun,
  },
  {
    id: 8,
    label: 'backgrounds.snow-mountains',
    Icon: PiMountainsFill,
  },
  {
    id: 9,
    label: 'backgrounds.office',
    Icon: HiOfficeBuilding,
  },
  {
    id: 10,
    label: 'backgrounds.underwater',
    Icon: FaWater,
  },
];
