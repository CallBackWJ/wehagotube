import {processUpload} from '../../../function/file'
export default {
  Mutation: {
    singleUpload: (obj, { file },{ request, isAuthenticated }) => processUpload(file,request, isAuthenticated),
  }
};
