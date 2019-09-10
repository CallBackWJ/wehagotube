import { prisma } from "../../../../prisma/generated/prisma-client";
import { generateToken } from "../../../../auth/jwt";
export default {
  Mutation: {
    signUp: async (_, args) => {
      const { name, avatar, email, accessToken, googleId } = args;
      const exist = await prisma.$exists.user({
        OR: [{ googleId }, { email }]
      });

      if (exist) {
        await prisma.updateUser({
          where: {
            email: email
          },
          data: {
            accessToken
          }
        });
      } else {
        await prisma.createUser({
          name,
          avatar,
          email,
          accessToken,
          googleId,
          permission: process.env.ADMIN === email ? "ADMIN" : "USER"
        });
      }

      return generateToken(email);
    }
  }
};
