import React from 'react';
import { Bell, User, Moon, Camera, Grid3X3, Grid } from 'lucide-react';
import { StreamMetrics } from '../types';

interface HeaderProps {
  metrics: StreamMetrics;
  onToggleNightVision: () => void;
  onTakeSnapshot: () => void;
  onToggleGrid: () => void;
  showGrid: boolean;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  metrics,
  onToggleNightVision,
  onTakeSnapshot,
  onToggleGrid,
  showGrid,
  onOpenNotifications,
  onOpenProfile,
}) => {
  return (
    <header className="px-4 pt-4 pb-2 space-y-3">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        {/* App Title & Info */}
        <div className="flex items-center gap-2.5">
          {/* Logo Icon */}
          <div className="w-10 h-10 rounded-2xl bg-[#e1ede8] flex items-center justify-center text-[#235848] shadow-xs">
            <Grid3X3 className="w-5 h-5 text-[#2d6856]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[19px] font-bold text-[#1a231f] tracking-tight">
                Talk to Me
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-semibold text-[#255e4e] bg-[#edf6f2] border border-[#b8d6cb] rounded-full">
                RPI 5
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-[#63756e] font-normal mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#34a853] animate-pulse"></span>
              <span>Live Vision</span>
              <span>·</span>
              <span>{metrics.tempC}°C</span>
              <span>·</span>
              <span>{metrics.fps} FPS</span>
            </div>
          </div>
        </div>

        {/* Right Top Actions */}
        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <button
            id="notifications-btn"
            onClick={onOpenNotifications}
            className="w-9 h-9 rounded-full bg-white border border-gray-200/80 shadow-xs flex items-center justify-center text-[#37453f] hover:bg-gray-50 active:scale-95 transition-all relative"
            aria-label="알림"
          >
            <Bell className="w-4 h-4 text-gray-700" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2d6856] rounded-full ring-2 ring-white"></span>
          </button>

          {/* Profile Button */}
          <button
            id="profile-btn"
            onClick={onOpenProfile}
            className="w-9 h-9 rounded-full bg-white border border-gray-200/80 shadow-xs flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
            aria-label="프로필"
          >
            <User className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Stream Controls Sub-Bar */}
      <div className="flex items-center justify-between gap-1.5 pt-0.5">
        {/* Stream Status Pill */}
        <div className="bg-white/90 backdrop-blur-xs border border-gray-200/80 rounded-full px-3.5 py-1.5 flex items-center gap-2 text-[12px] font-medium text-[#2d3a34] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#34a853]"></span>
          <span className="font-semibold text-gray-800">라이브 스트림</span>
          <span className="text-gray-300">·</span>
          <span className="text-gray-600">{metrics.resolution}</span>
          <span className="text-gray-300">·</span>
          <span className="text-gray-600">{metrics.latencyMs}ms 지연율</span>
        </div>

        {/* Night IR Toggle */}
        <button
          id="night-ir-btn"
          onClick={onToggleNightVision}
          className={`px-3 py-1.5 rounded-full text-[12px] font-medium border flex items-center gap-1.5 transition-all shadow-xs active:scale-95 ${
            metrics.nightVision
              ? 'bg-[#1b3d30] text-emerald-300 border-[#2d6856]'
              : 'bg-white/90 text-gray-700 border-gray-200/80 hover:bg-gray-50'
          }`}
          title="야간 적외선 모드 전환"
        >
          <Moon className={`w-3.5 h-3.5 ${metrics.nightVision ? 'text-emerald-300 fill-emerald-300' : 'text-gray-600'}`} />
          <span>야간 IR</span>
        </button>

        {/* Snapshot Button */}
        <button
          id="snapshot-btn"
          onClick={onTakeSnapshot}
          className="w-8 h-8 rounded-full bg-white/90 border border-gray-200/80 shadow-xs flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-90 transition-all"
          title="화면 캡처"
        >
          <Camera className="w-4 h-4 text-gray-700" />
        </button>

        {/* Grid Overlay Toggle */}
        <button
          id="grid-toggle-btn"
          onClick={onToggleGrid}
          className={`w-8 h-8 rounded-full border shadow-xs flex items-center justify-center active:scale-90 transition-all ${
            showGrid
              ? 'bg-[#edf6f2] border-[#2d6856] text-[#2d6856]'
              : 'bg-white/90 border-gray-200/80 text-gray-700 hover:bg-gray-50'
          }`}
          title="안내선 격자 표시"
        >
          <Grid className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
