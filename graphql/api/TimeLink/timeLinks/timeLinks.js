import { prisma } from "../../../../prisma/generated/prisma-client";
export default {
  Query: {
    timeLinks: async (_, { videoId }) =>
      await prisma.timeLinks({
        where: {
          videoId
        },orderBy:"time_ASC"
      })
  }
};
