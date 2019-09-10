import { prisma } from "../../../../prisma/generated/prisma-client";
export default {
  Mutation: {
    createTimeLink: async (_, args) => {
      const { videoId, time, desc } = args;
       await prisma.createTimeLink({
        videoId,
        time,
        desc
      });

      
      return await prisma.timeLinks({
        where: { videoId: videoId },orderBy:"time_ASC"}
      );
    }
  }
};
