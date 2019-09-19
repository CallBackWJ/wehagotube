import axios from "axios";
import FormData from "form-data";
// import {google} from "googleapis"
// const youtube =google.youtube("v3");
const key = process.env.KEY;
const URL = `https://www.googleapis.com/youtube/v3/thumbnails/set`;

export const processUpload = async (upload, request, isAuthenticated) => {
  const { createReadStream, filename, mimetype, encoding } = await upload;
  if (!isAuthenticated(request)) {
    return false;
  }

 

  const form_data = new FormData();
  form_data.append("file", await createReadStream());

  const headers = {
    Authorization: "Bearer " + request.user.accessToken,
    "Content-Type": "image/png",
    "Content-Length":1000000
  };
await createReadStream().on('end', () => console.log('Lecture terminée'))
  .on('data', (data) => {
   console.log('%d octets reçus', data.length);
  });

  const data=await axios({
    method: "post",
    params: {
      key,
      videoId: "-2naxMvqbGA",
      fields: "items",
    },
    url: URL,
    headers,
    body:{media: {
        mimeType: "image/png",
        body: await createReadStream()
      }}
  })

  console.log("data test::::",data);
  // const { id, path } = await storeUpload({ stream, filename })
  // return recordFile({ id, filename, mimetype, encoding, path })
};
