import {insertChat} from '../../../function/chat'
export default {
    Mutation: {
        insertChat: (_, { chatId,message },{ request, isAuthenticated }) => insertChat(chatId,message,request,isAuthenticated),
  }
};
