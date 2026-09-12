import React, { useRef, useState, useEffect } from 'react';
import { Video, Search, Maximize2, Sparkles, BookOpen, Coffee, CheckCircle2, SwitchCamera } from 'lucide-react';
import { DetectedObject, StreamMetrics } from '../types';

interface VisionFeedProps {
  metrics: StreamMetrics;
  objects: DetectedObject[];
  onSelectObject: (obj: DetectedObject) => void;
  selectedZoom: number;
  onSelectZoom: (zoom: number) => void;
  showGrid: boolean;
  snapshotFlash: boolean;
}

export const VisionFeed: React.FC<VisionFeedProps> = ({
  metrics,
  objects,
  onSelectObject,
  selectedZoom,
  onSelectZoom,
  showGrid,
  snapshotFlash,
}) => {
  const [useWebcam, setUseWebcam] = useState(false);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamActive, setStreamActive] = useState(false);

  // Handle real webcam feed when enabled
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (useWebcam) {
      navigator.mediaDevices?.getUserMedia({ video: true })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.play();
            setStreamActive(true);
            setWebcamError(null);
          }
        })
        .catch((err) => {
          console.warn('Webcam permission or device error:', err);
          setWebcamError('웹캠을 불러올 수 없어 시뮬레이션 모드로 전환합니다.');
          setUseWebcam(false);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
        setStreamActive(false);
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [useWebcam]);

  const toggleWebcam = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUseWebcam(!useWebcam);
  };

  return (
    <div className="px-4">
      <div
        id="vision-canvas-container"
        className={`relative w-full aspect-[4/4.3] rounded-[28px] overflow-hidden shadow-sm border border-gray-200/60 transition-all duration-300 select-none ${
          metrics.nightVision
            ? 'bg-[#0f1f18] saturate-150 hue-rotate-30 brightness-95'
            : 'bg-gradient-to-b from-[#c4ceca] via-[#ccd6d1] to-[#a8b4ae]'
        }`}
      >
        {/* Shutter flash animation */}
        {snapshotFlash && (
          <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-300 pointer-events-none" />
        )}

        {/* Real Webcam Video layer if enabled */}
        {useWebcam && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* Simulated Desk Vision Backdrop */}
        {!useWebcam && (
          <div
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-transform duration-500 ease-out"
            style={{
              transform: `scale(${selectedZoom === 1 ? 1 : selectedZoom === 2 ? 1.18 : 1.35})`,
            }}
          >
            {/* Subtle desk texture & lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.45)_0%,rgba(160,175,168,0.3)_60%,rgba(130,145,138,0.6)_100%)]" />

            {/* Simulated items visual silhouettes */}
            {/* User silhouette top */}
            <div className="absolute top-16 w-32 h-32 rounded-full bg-white/20 blur-md pointer-events-none" />
            
            {/* Center Watermark Text matching screenshot */}
            <div className="text-center z-10 opacity-75 pointer-events-none select-none px-4">
              <p className="text-[14px] font-bold text-[#2a4d3f] tracking-tight">
                라즈베리 파이 실시간 AI 비전 피드
              </p>
              <p className="text-[11px] font-medium text-[#466559] mt-0.5 tracking-wide">
                1080P 30FPS · IMX708 와이드 앵글
              </p>
            </div>
          </div>
        )}

        {/* 3x3 Grid Overlay (Optional toggle) */}
        {showGrid && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none z-10">
            <div className="border-r border-b border-white/25"></div>
            <div className="border-r border-b border-white/25"></div>
            <div className="border-b border-white/25"></div>
            <div className="border-r border-b border-white/25"></div>
            <div className="border-r border-b border-white/25"></div>
            <div className="border-b border-white/25"></div>
            <div className="border-r border-white/25"></div>
            <div className="border-r border-white/25"></div>
            <div></div>
          </div>
        )}

        {/* Top Overlay Status Pill */}
        <div className="absolute top-3 left-3 right-3 z-20">
          <div className="bg-white/85 backdrop-blur-md rounded-2xl px-3.5 py-1.5 border border-white/60 shadow-xs flex items-center justify-between text-[11px] text-[#2c3d36]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse" />
              <span className="font-bold tracking-tight text-gray-800">
                CAM V3 12MP (IMX708)
              </span>
            </div>

            <div className="w-[1px] h-3 bg-gray-300/80" />

            <span className="text-gray-600 font-medium">라즈베리파이 스트림</span>

            <div className="w-[1px] h-3 bg-gray-300/80" />

            <span className="text-gray-600 font-medium">{metrics.bitrateMbps} Mbps</span>

            <div className="w-[1px] h-3 bg-gray-300/80" />

            <div className="flex items-center gap-1 font-bold text-[#1f6652]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1f6652] hidden sm:inline" />
              <span>정상 작동</span>
            </div>
          </div>
        </div>

        {/* Webcam toggle button in top-right */}
        <button
          onClick={toggleWebcam}
          className="absolute top-12 left-3 z-20 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-medium border border-white/20 flex items-center gap-1 hover:bg-black/60 transition-all"
          title="실제 웹캠 또는 시뮬레이션 전환"
        >
          <SwitchCamera className="w-3 h-3" />
          <span>{useWebcam ? '시뮬레이션 피드로 복귀' : '실제 카메라 연결'}</span>
        </button>

        {/* Bounding Box 1: 민우 (사용자) 98% 일치 */}
        <div
          id="box-user"
          onClick={() => onSelectObject(objects[0])}
          className="absolute top-[18%] left-[28%] w-[44%] h-[35%] border-2 border-[#2b6352] rounded-[24px] cursor-pointer group transition-all duration-200 hover:shadow-lg hover:border-emerald-600 z-15"
        >
          {/* Label Pill on top */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-xs rounded-full px-2.5 py-0.5 text-[11px] font-bold text-[#1b2d24] border border-[#2b6352]/30 shadow-xs flex items-center gap-1.5 group-hover:scale-105 transition-transform">
            <span className="w-2 h-2 rounded-full bg-[#2b6352]" />
            <span>민우 (사용자)</span>
            <span className="bg-[#e6f4ee] text-[#225745] font-semibold text-[10px] px-1.5 py-0.2 rounded-full">
              98% 일치
            </span>
          </div>

          {/* Center translucent camera icon */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-white/35 backdrop-blur-xs flex items-center justify-center border border-white/40 shadow-xs group-hover:bg-white/50 transition-all">
              <Video className="w-7 h-7 text-[#2b6352]" />
            </div>
          </div>
        </div>

        {/* Bounding Box 2: 스마트 텀블러 94% */}
        <div
          id="box-tumbler"
          onClick={() => onSelectObject(objects[1])}
          className="absolute bottom-[23%] left-[13%] w-[25%] h-[28%] border-2 border-[#54738c] rounded-[22px] cursor-pointer group transition-all duration-200 hover:shadow-lg hover:border-blue-600 z-15"
        >
          {/* Label Pill on top */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-xs rounded-full px-2 py-0.5 text-[11px] font-bold text-[#1b3447] border border-[#54738c]/30 shadow-xs flex items-center gap-1.5 group-hover:scale-105 transition-transform">
            <span className="text-[11px]">☕</span>
            <span>스마트 텀블러</span>
            <span className="bg-[#ebf4fa] text-[#2d5f82] font-semibold text-[10px] px-1.5 py-0.2 rounded-full">
              94%
            </span>
          </div>
        </div>

        {/* Bounding Box 3: 기획 노트 89% */}
        <div
          id="box-notebook"
          onClick={() => onSelectObject(objects[2])}
          className="absolute bottom-[17%] right-[14%] w-[34%] h-[28%] border-2 border-[#8b82a8] rounded-[22px] cursor-pointer group transition-all duration-200 hover:shadow-lg hover:border-purple-600 z-15"
        >
          {/* Label Pill on top */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-xs rounded-full px-2 py-0.5 text-[11px] font-bold text-[#292040] border border-[#8b82a8]/30 shadow-xs flex items-center gap-1.5 group-hover:scale-105 transition-transform">
            <BookOpen className="w-3 h-3 text-[#584982]" />
            <span>기획 노트</span>
            <span className="bg-[#f3f0fa] text-[#5e4e87] font-semibold text-[10px] px-1.5 py-0.2 rounded-full">
              89%
            </span>
          </div>
        </div>

        {/* Right Floating Zoom Controls */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
          <div className="bg-white/85 backdrop-blur-md rounded-full py-1.5 px-1 flex flex-col items-center gap-1 border border-white/70 shadow-sm">
            <button
              id="zoom-1x"
              onClick={() => onSelectZoom(1)}
              className={`w-7 h-7 rounded-full text-[12px] font-bold flex items-center justify-center transition-all ${
                selectedZoom === 1
                  ? 'bg-[#254f41] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-black/5'
              }`}
            >
              1x
            </button>
            <button
              id="zoom-2x"
              onClick={() => onSelectZoom(2)}
              className={`w-7 h-7 rounded-full text-[12px] font-bold flex items-center justify-center transition-all ${
                selectedZoom === 2
                  ? 'bg-[#254f41] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-black/5'
              }`}
            >
              2x
            </button>
            <button
              id="zoom-5x"
              onClick={() => onSelectZoom(5)}
              className={`w-7 h-7 rounded-full text-[12px] font-bold flex items-center justify-center transition-all ${
                selectedZoom === 5
                  ? 'bg-[#254f41] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-black/5'
              }`}
            >
              5x
            </button>

            <div className="w-4 h-[1px] bg-gray-300 my-0.5" />

            <button
              id="zoom-search-btn"
              onClick={() => onSelectZoom(selectedZoom === 1 ? 2 : selectedZoom === 2 ? 5 : 1)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-700 hover:bg-black/5 active:scale-90 transition-all"
              title="돋보기 탐색"
            >
              <Search className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Bottom Floating Pinch Zoom Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
          <div className="bg-white/85 backdrop-blur-md rounded-full px-4 py-1.5 text-[11px] font-medium text-gray-700 border border-white/60 shadow-xs flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-gray-600" />
            <span>두 손가락으로 핀치 확대 및 화면 터치 탐색</span>
          </div>
        </div>
      </div>

      {webcamError && (
        <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg mt-1 border border-amber-200">
          {webcamError}
        </p>
      )}
    </div>
  );
};
