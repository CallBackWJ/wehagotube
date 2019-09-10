import axios from "axios";
const URL = "https://www.googleapis.com/youtube/v3/liveChat/messages";
const key = "AIzaSyDUNtxUrf1W61q58FAC3mLSvg-trN41A0Q";
export const chatList = async (chatId) => {
    const { data } = await axios(URL, {
      params: { part: "snippet,authorDetails", key,liveChatId:chatId}
    });
  
    console.log("##########chatList:",data);
    return data.items.map(item => ({
        googleId: item.snippet.authorChannelId,
        avatar: item.authorDetails.profileImageUrl,
        name: item.authorDetails.displayName,
        message: item.snippet.textMessageDetails.messageText,
        author: item.authorDetails.isChatOwner,
    }));
  };