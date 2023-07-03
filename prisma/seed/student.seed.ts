import { Student } from '@prisma/client';
import { EGender, ERole } from '../../common/enum/student';
import helper from '../../src/utils/helper';

const student: Student[] = [
  {
    id: 'S_0001',
    account: 'tuongnb',
    password: String(helper.hash('ProPhet@456')),
    firstName: 'Bổn Tường',
    lastName: 'Nhâm',
    fullName: 'Nhâm Bổn Tường',
    phone: '0793229970',
    email: 'nbtuong1994@gmail.com',
    gender: EGender.MALE,
    birthday: '1994-11-28T00:00:00+07:00',
    fullAddress: '79/24/13 Âu Cơ, Phường 14, Quận 11, Hồ Chí Minh',
    address: '79/24/13 Âu Cơ',
    cityCode: 'HC',
    districtCode: 'HC476',
    wardCode: '27214',
    role: ERole.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'S_0002',
    account: 'jack1994',
    password: String(helper.hash('123456')),
    firstName: 'Jack',
    lastName: 'Williams',
    fullName: 'Jack Williams',
    phone: '0793229982',
    email: 'jack1994@gmail.com',
    gender: EGender.MALE,
    birthday: '1994-11-28T00:00:00+07:00',
    fullAddress: '79/24/13 Âu Cơ, Phường 14, Quận 11, Hồ Chí Minh',
    address: '79/24/13 Âu Cơ',
    cityCode: 'HC',
    districtCode: 'HC476',
    wardCode: '27214',
    role: ERole.STUDENT,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default student;
