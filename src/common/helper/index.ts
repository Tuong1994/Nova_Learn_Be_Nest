import { PrismaClient } from '@prisma/client';
import { Response, NextFunction } from 'express';

const prisma = new PrismaClient();

const helper = {
  getDefaultCollection: () => {
    return { total: 0, page: 1, items: [] };
  },

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

  checkRecord: async (arg: {
    model: any;
    id: string;
    message: string;
    res: Response;
    next: NextFunction;
  }) => {
    const { model, id, message, res, next } = arg;

    const record = await model.findUnique({ where: { id } });

    if (!record) return res.status(404).json({ statusCode: 404, message });

    next();
  },
};

export default helper;
