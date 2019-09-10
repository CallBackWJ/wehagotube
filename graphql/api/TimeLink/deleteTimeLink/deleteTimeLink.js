import { prisma } from "../../../../prisma/generated/prisma-client";
export default {
  Mutation: {
    deleteTimeLink: async (_, args) => {
      const { id,videoId} = args;
      await prisma.deleteTimeLink({
       id
      });
      return await prisma.timeLinks({
        where: { videoId: videoId },orderBy:"time_ASC"}
      );
    }
  }
};
