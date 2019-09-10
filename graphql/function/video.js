import axios from "axios";
const VIDEOS_URL = "https://www.googleapis.com/youtube/v3/videos";
const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const key = "AIzaSyDUNtxUrf1W61q58FAC3mLSvg-trN41A0Q";
//const key = "d";
const channelId = "UCNyYcimkxVcbqp9DUx57nog";

const search = async (eventType, q) => {
  const { data } = await axios(SEARCH_URL, {
    params: {
      channelId,
      key,
      part: "id",
      type: "video",
      order: "date",
      maxResults: 10,
      eventType,
      q
    }
  });
 
  return data.items.reduce((acc, item) => acc + "," + item.id.videoId, "");
};

export const getVideoList = async (eventType, keyword) => {
  const id = await search(eventType, keyword);
  console.log(eventType,":",id);
  const { data } = await axios(VIDEOS_URL, {
    params: { part: "snippet,liveStreamingDetails,statistics", key, id }
  });

  const filter =
    eventType === "upcoming"
      ? data.items.filter(i => i.snippet.liveBroadcastContent === "upcoming")
      : data.items.filter(i => i.snippet.liveBroadcastContent === "none");

  return filter.map(item => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailDefault: item.snippet.thumbnails.default.url,
    thumbnailStandard: item.snippet.thumbnails.high.url,
    liveBroadcastContent: item.snippet.liveBroadcastContent,
    publishedAt: item.snippet.publishedAt,
    viewCount: item.statistics.viewCount,
    scheduledStartTime: item.liveStreamingDetails.scheduledStartTime,
    activeLiveChatId:item.liveStreamingDetails.activeLiveChatId,
  }));
};

export const getLiveVideo = async () => {
  const id = await search(null, null);
  const { data } = await axios(VIDEOS_URL, {
    params: {
      part: "snippet,liveStreamingDetails",
      key,
      id
    }  
  });

  const tenMinutesCheck = date =>Math.abs(new Date() - new Date(date)) <= 600000;

  const CurrentVideo = data.items.find(item =>
    item.snippet.liveBroadcastContent === "live" ||
    tenMinutesCheck(item.liveStreamingDetails.scheduledStartTime) ||
    tenMinutesCheck(item.liveStreamingDetails.actualEndTime)
  );

  return CurrentVideo
    ? {
        id: CurrentVideo.id,
        title: CurrentVideo.snippet.title,
        description: CurrentVideo.snippet.description,
        thumbnailStandard: CurrentVideo.snippet.thumbnails.high.url,
        liveBroadcastContent: CurrentVideo.snippet.liveBroadcastContent,
        concurrentViewers: CurrentVideo.liveStreamingDetails.concurrentViewers,
        activeLiveChatId:CurrentVideo.liveStreamingDetails.activeLiveChatId
      }
    : null;
};
