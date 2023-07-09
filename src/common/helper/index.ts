import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const helper = {
  getFullName: (firstName: string, lastName: string) => {
    if (!firstName && !lastName) return '';

    if (firstName && !lastName) return '';

    if (!firstName && lastName) return '';

    return `${lastName} ${firstName}`;
  },

  getFullAddress: async (
    address: string,
    cityCode: string,
    districtCode: string,
    wardCode: string,
  ) => {
    const addr = {
      fullAddressEng: '',
      fullAddressVn: '',
    };

    if (!address && !cityCode && !districtCode && !wardCode) return addr;

    const city = await prisma.city.findFirst({ where: { code: cityCode } });

    const district = await prisma.district.findFirst({ where: { code: districtCode } });

    const ward = await prisma.ward.findFirst({ where: { code: wardCode } });

    if (!city && !district && !ward) return addr;

    addr.fullAddressEng = `${address} ${ward.nameEng} ${district.nameEng} ${city.nameEng}`;

    addr.fullAddressVn = `${address} ${ward.nameVn} ${district.nameVn} ${city.nameVn}`;

    return addr;
  },
};

export default helper;
