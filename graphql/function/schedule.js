import axios from "axios";
const key = process.env.KEY;
const URL = `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet,status&fields=snippet,status&key=${key}`;

export const createSchedule = async (title,desc,start,status,request,isAuthenticated) => {
    if(!isAuthenticated(request)){
        return false;
    }
    console.log("createSchedule::accessToken::",request.user.accessToken);
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " +request.user.accessToken
  };

  const data = {
    snippet: {
      scheduledStartTime: start,
      title,
      description:desc
    },
    status: {
      privacyStatus: status
    }
  };

  const val  = await axios({
    method: "post",
    url: URL,
    headers,
    data
  });

  
  return true;
};
