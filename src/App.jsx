import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { API_KEY } from "../const";
import { BASE_URL } from "../const";
import axios from "axios";
import { useState } from "react";

export const App = ()  => {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = { <Home/> }/>
      </Routes>
    </Router>
  )
};

export const Home = () => {
  const [videos, setVideos]  = useState([]);

  const TopPage = async (query) => {
    try {
      const response = await axios.get(BASE_URL,{
        params: {
          key: API_KEY,
          part : "snippet",
          q : query,
          type : "video",
          maxResults : 10
        }
        });
        console.log(response.data);
        setVideos(response.data.items);
    }
    catch (error) {
      console.error("YouTubeデータの取得に失敗:", error);
    }
  };

  return (
    <div>
      <h1>youtube</h1>
      <button onClick = {() => TopPage("アニメ")}>データ取得</button>
      {videos.map((video) =>  (
        <div key = {video.id.videoId}>
          <img src = {video.snippet.thumbnails.medium.url}/>
          <p>{video.snippet.title}</p>
        </div>
      ))}
    </div>
  );
};