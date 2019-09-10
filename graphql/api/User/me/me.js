import {prisma} from '../../../../prisma/generated/prisma-client'
export default {
    Query: {
      me: async (_, __, { request, isAuthenticated }) => {
        if(isAuthenticated(request)){
            const { user } = request;
            return await prisma.user({ id: user.id });
        }else{
            return await prisma.user({ id: '없음' });
        }
        
      }
    }
  };
  
