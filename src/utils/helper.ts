import * as argon from 'argon2';

const helper = {
  hash: async (p: string) => {
    const hashPass = await argon.hash(p);

    return hashPass;
  },

  paging: <M>(r: M[], p: number, l: number) => {
    
  },
};

export default helper;
