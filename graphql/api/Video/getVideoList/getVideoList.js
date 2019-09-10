import {getVideoList} from '../../../function/video'
export default {
  Query: {
    getVideoList: (_, { eventType,keyword }) => getVideoList(eventType,keyword),
  }
};
