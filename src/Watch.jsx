import { useParams } from "react-router-dom";

export const Watch  = () => {
    const { videoId } = useParams();

    return (
        <div className="flex flex-col items-center p-8 bg-black min-h-screen text-white">
            <div className="w-full max-w-4xl aspect-video">
                <iframe 
                width = "100%" 
                height = "100%" 
                src = {`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
                frameborder="0"
                allowFullScreen>
                </iframe>
            </div>
            <h2 className = "mt-6 text-2xl font-bold" >動画再生中</h2>
            <button onClick = {() => window.history.back()}>戻る</button>
        </div>
    )
 };