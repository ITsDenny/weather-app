import axios from 'axios';

const BASEURL = 'https://api.openweathermap.org/data/2.5/weather';
const appId = '38ba59c4ec6985a22a9b969fbfbb15f8';

const weatherByCity = (city) => {
  return axios.get(BASEURL, {
    params: {
      appid: appId,
      q: city,
    }
  });
};

export default { weatherByCity };
