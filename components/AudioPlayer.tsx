"use client";
import { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  src: string; // Đường dẫn file mp3
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  // Dùng useRef để "nắm đầu" cái thẻ <audio> tàng hình ở dưới
  const audioRef = useRef<HTMLAudioElement>(null);

  // Các State để quản lý trạng thái nhạc
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 1. Hàm Bật/Tắt nhạc
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 2. Hàm cập nhật thời gian đang chạy
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // 3. Hàm lấy tổng thời lượng bài hát ngay khi load xong
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // 4. Hàm Tua nhạc (Khi kéo thanh trượt)
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // 5. Hàm fomat giây thành phút:giây (VD: 65s -> 01:05)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // 6. Tính phần trăm để tô màu xanh cho thanh trượt
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-white border border-slate-100 shadow-sm p-3 md:p-4 rounded-2xl flex items-center  gap-4 font-lexend">
      {/* Thẻ audio GỐC bị giấu đi, chỉ để chạy ngầm */}
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)} // Hết bài tự động đổi nút thành Play
      />

      {/* Nút Play / Pause */}
      <button
        onClick={togglePlay}
        className="w-10 h-10 shrink-0 flex items-center justify-center bg-slate-900 text-white rounded-full hover:bg-emerald-500 hover:scale-105 transition-all duration-300 shadow-sm cursor-pointer"
      >
        <span
          className="material-symbols-outlined text-[28px]"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          {isPlaying ? "pause" : "play_arrow"}
        </span>
      </button>

      {/* Khu vực Thanh trượt & Thời gian */}
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="relative w-full h-2 bg-slate-100 rounded-full flex items-center group">
          {/* Vùng màu xanh lá lấp đầy phần đã chạy */}
          <div
            className="absolute left-0 top-0 h-full bg-emerald-500 rounded-full pointer-events-none"
            style={{ width: `${progressPercent}%` }}
          ></div>

          {/* Thanh input Range tàng hình nằm đè lên để user nắm kéo tua nhạc */}
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Hiển thị số phút */}
        <div className="flex justify-between text-[13px] font-semibold text-slate-400">
          <span className="text-emerald-600">{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
