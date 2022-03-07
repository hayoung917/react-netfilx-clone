import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "641d7821f1c60ede729e6181457baa09",
    language: "ko-KR",
  },
});

export default instance;
