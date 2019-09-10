import {createSchedule} from '../../../function/schedule'
export default {
    Mutation: {
        createSchedule: (_, { title,desc,start,status },{ request, isAuthenticated }) => createSchedule(title,desc,start,status,request,isAuthenticated),
  }
};
