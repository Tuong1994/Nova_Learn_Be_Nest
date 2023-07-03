import * as argon from "argon2"

const helper = {
  hash: async (p: string) => {
    const hashPass = await argon.hash(p);

    return hashPass;
  },
};

export default helper;
