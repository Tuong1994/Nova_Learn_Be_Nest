import * as bcryptjs from 'bcryptjs';

const utils = {
  hash: (p: string) => {
    const salt = bcryptjs.genSaltSync(10);

    const hashPass = bcryptjs.hashSync(p, salt);

    return hashPass;
  },

  paging: <M>(records: M[], p: string, l: string) => {
    const page = Number(p);

    const limit = Number(l);

    const total = records.length;

    const start = (page - 1) * limit;

    const end = start + limit;

    const items = records.slice(start, end);

    return { total, page, items };
  },
};

export default utils;
