import axios from "axios";
const URL = "https://www.googleapis.com/youtube/v3/liveChat/messages";
const key = process.env.KEY;
export const chatList = async (chatId) => {
    const { data } = await axios(URL, {
      params: { part: "snippet,authorDetails", key,liveChatId:chatId}
    });
    return data.items.map(item => ({
        googleId: item.snippet.authorChannelId,
        avatar: item.authorDetails.profileImageUrl,
        name: item.authorDetails.displayName,
        message: item.snippet.textMessageDetails.messageText,
        author: item.authorDetails.isChatOwner,
    }));
  };


  export const insertChat=async (chatId,message,request,isAuthenticated)=>{
    if(!isAuthenticated(request)){
        return false;
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +request.user.accessToken
      };
    
      const data = {
        snippet: {
            liveChatId: chatId,
            type:"textMessageEvent",
            textMessageDetails:{
                messageText:message
            }
        }
      };
    
      const val  = await axios({
        method: "post",
        url: URL+"?part=snippet",
        headers,
        data
      });
    
      
      return true;

  }
 
