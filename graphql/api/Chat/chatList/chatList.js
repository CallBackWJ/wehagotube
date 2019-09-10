import {chatList} from '../../../function/chat'
export default {
  Query: {
    chatList: (_, { chatId }) => chatList(chatId),
  }
};
