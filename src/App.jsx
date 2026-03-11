import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { API_KEY } from "../const";
import { BASE_URL } from "../const";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

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
  const [inputsearch, setInputSearch] = useState("");


    const TopPage = useCallback(async (query) => {
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
  }, []);
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      TopPage(inputsearch)
    }
  };

  useEffect(() => {
    TopPage("アニメ");
  }, [TopPage]);

  return (
    <div>
      <h1>youtube</h1>

      {/* 2. 入力欄を作る */}
      <input type="text" 
      placeholder = "検索キーワード"
      value = {inputsearch} 
      onChange = {(e) => setInputSearch(e.target.value)}
      onKeyDown = {handleKeyDown}/>
      {/* 文字を打つたびに保存 */}
      {/* 検索した時にエンターが押せる */}

      {/* <button onClick = {() => TopPage("アニメ")}>データ取得</button> */}

      {/* 3. ボタンを押した時に「保存された文字」で検索 */}
      {/* <button onClick = {() => TopPage(inputsearch)}>検索実行</button> */}
      {videos.map((video) =>  (
        <div key = {video.id.videoId}>
          <img src = {video.snippet.thumbnails.medium.url}/>
          <p>{video.snippet.title}</p>
        </div>
      ))}
    </div>
  );
};