import * as bcryptjs from 'bcryptjs';
import * as fs from 'fs';

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

  removeFile: (path: string, message?: string) => {
    if (!path) return;

    return fs.unlink(path, (err) => {
      if (err) throw err;

      console.log(message ?? 'File is deleted');
    });
  },
};

export default utils;
