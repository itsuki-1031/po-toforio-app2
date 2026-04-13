import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { API_KEY } from "../const";
import { BASE_URL } from "../const";
import axios from "axios";
import { useEffect, useState } from "react";
import { Watch } from "./Watch";
import { useNavigate } from "react-router-dom";


export const App = ()  => {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = { < Home/> }/>
        <Route path = "/watch/:videoId" element =  {< Watch/>}/>
      </Routes>
    </Router>
  )
};

export const Home = () => {
  // ① 状態（state）の定義 データを保存する場所
  const [videos, setVideos]  = useState([]);
  const [inputsearch, setInputSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isOpen, setIsOpen ] = useState(false);

  const category = ["人気", "アニメ", "ゲーム", "音楽", "映画"]
  const navigate = useNavigate();
  


   // ② 関数（処理）の定義 API呼び出し・クリック処理など
    const TopPage = async (query) => {
      setLoading(true);
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
    finally {
      setLoading(false);
    }
  };
  
  // ③ useEffect（自動処理）の定義 ページ開いた時・状態変わった時に動く
  useEffect(() =>  {
    TopPage("人気");
  }, []);

  //Enter押されたら検索する」だけのイベント処理関数 書くのはどこでもいい
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (inputsearch.trim() === "") return;// 空の検索を防止
      TopPage(inputsearch)
    }
  };

  // ④ UI（return）の定義  画面の見た目 
  return (
    <div className = "min-h-screen bg-gray-50 text-gray-900">
      <h1>youtube</h1>
      {/* 2. 入力欄を作る */}
      <input type="text" 
      placeholder = "検索キーワード"
      value = {inputsearch} 
      onChange = {(e) => setInputSearch(e.target.value)}
      onKeyDown = {handleKeyDown}/>
      {/* 文字を打つたびに保存 */}
      {/* 検索した時にエンターが押せる */}

      {/* 3. ボタンを押した時に「保存された文字」で検索 */}

      <div className = "relative inline-block mt-2">
        <button onClick = {() => setIsOpen(!isOpen)}
          className="px-3 py-2 bg-gray-300 rounded">
            {selectedCategory} ▼
          </button>

          {isOpen && (
            <div className="absolute bg-white border mt-1 rounded shadow w-32 z-50">
              {category.map((category) => (
                <div key = {category}
                  onClick = {() => {
                    setSelectedCategory(category);
                    // TopPage(category === "all" ? "人気": category);
                    TopPage(category);
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                    {category}
                </div>
              ))}
            </div>
          )}
      </div>


      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {/* {filteredVideos.map((video) => ( */}
          {videos.map((video) => (
            <div key = {video.id.videoId} className="shadow rounded overflow-hidden">
              <img src = {video.snippet.thumbnails.medium.url} 
              onClick = {() => navigate(`/watch/${video.id.videoId}`)}
              className="cursor-pointer hover:opacity-80" />
              <p className="p-2 text-sm">{video.snippet.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
