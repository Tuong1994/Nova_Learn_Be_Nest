import { City } from '@prisma/client';

const city: City[] = [
  {
    id: 'HI',
    nameEng: 'Ha Noi',
    nameVn: 'Hà Nội',
    code: 'HI',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'HC',
    nameEng: 'Ho Chi Minh',
    nameVn: 'Hồ Chí Minh',
    code: 'HC',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default city;
