import React from 'react';
import { Mic, MicOff, Camera, AudioLines } from 'lucide-react';

interface VoiceControlsProps {
  isSpeaking: boolean;
  onToggleSpeaking: () => void;
  isMicOn: boolean;
  onToggleMic: () => void;
  onRegisterObject: () => void;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  isSpeaking,
  onToggleSpeaking,
  isMicOn,
  onToggleMic,
  onRegisterObject,
}) => {
  return (
    <div className="px-4 mt-3 space-y-3">
      {/* Speaking Indicator Status Bar */}
      <div className="flex justify-center">
        <button
          id="speaking-status-pill"
          onClick={onToggleSpeaking}
          className="bg-white/95 backdrop-blur-xs rounded-full px-4 py-1.5 border border-gray-200/80 shadow-2xs flex items-center gap-2 text-[12px] hover:bg-gray-50 active:scale-95 transition-all"
        >
          {/* Animated Wave Equalizer Bars */}
          <div className="flex items-end gap-[2px] h-3.5 w-4">
            <span
              className={`w-[2.5px] bg-[#34a853] rounded-full transition-all duration-300 ${
                isSpeaking ? 'h-3.5 animate-pulse' : 'h-1.5 opacity-60'
              }`}
            />
            <span
              className={`w-[2.5px] bg-[#235848] rounded-full transition-all duration-200 ${
                isSpeaking ? 'h-2 animate-pulse delay-75' : 'h-2 opacity-60'
              }`}
            />
            <span
              className={`w-[2.5px] bg-[#34a853] rounded-full transition-all duration-300 ${
                isSpeaking ? 'h-3 animate-pulse delay-150' : 'h-1.5 opacity-60'
              }`}
            />
            <span
              className={`w-[2.5px] bg-[#235848] rounded-full transition-all duration-200 ${
                isSpeaking ? 'h-2.5 animate-pulse delay-100' : 'h-1 opacity-60'
              }`}
            />
          </div>

          <span className="font-bold text-gray-800 tracking-tight">
            {isSpeaking ? 'AI 대화 중 (Speaking)' : 'AI 대기 중 (Ready)'}
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-gray-500 font-normal">
            {isSpeaking ? '탭하여 일시 정지' : '탭하여 음성 재생'}
          </span>
        </button>
      </div>

      {/* Main Action Dock Card */}
      <div
        id="bottom-action-dock"
        className="bg-white rounded-[24px] p-3.5 border border-gray-100/90 shadow-sm flex items-center justify-around"
      >
        {/* Left: Microphone Toggle */}
        <div className="flex flex-col items-center">
          <button
            id="mic-toggle-btn"
            onClick={onToggleMic}
            className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all active:scale-95 ${
              isMicOn
                ? 'bg-[#f4f3ee] text-gray-800 border-gray-200/80 hover:bg-[#eae8e0]'
                : 'bg-red-50 text-red-600 border-red-200'
            }`}
          >
            {isMicOn ? (
              <Mic className="w-6 h-6 text-gray-700" />
            ) : (
              <MicOff className="w-6 h-6 text-red-500" />
            )}
          </button>
          <span className="text-[12px] font-semibold text-gray-800 mt-1.5 tracking-tight">
            {isMicOn ? '마이크 ON' : '마이크 OFF'}
          </span>
        </div>

        {/* Center: Concentric Wave Voice Button */}
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            {/* Outer dotted pulsing ring */}
            <div
              className={`absolute -inset-2.5 rounded-full border border-dashed border-[#9ac2b3] pointer-events-none ${
                isSpeaking ? 'animate-spin-slow' : 'opacity-70'
              }`}
            />
            {/* Middle soft glow ring */}
            <div
              className={`absolute -inset-1 rounded-full bg-[#dbebe3]/40 ${
                isSpeaking ? 'animate-ping opacity-30' : 'hidden'
              }`}
            />

            {/* Core Sound Button */}
            <button
              id="voice-wave-main-btn"
              onClick={onToggleSpeaking}
              className="w-14 h-14 rounded-full bg-white shadow-md border border-emerald-100 flex items-center justify-center active:scale-95 transition-all text-[#255f4e] hover:bg-[#edf6f2]"
              title={isSpeaking ? '답변 중지' : '음성 안내 시작'}
            >
              <AudioLines className={`w-7 h-7 text-[#255f4e] ${isSpeaking ? 'animate-pulse' : ''}`} />
            </button>
          </div>

          <span className="text-[11px] font-medium text-gray-500 mt-2 tracking-tight">
            {isSpeaking ? '터치하여 답변 중지' : '터치하여 대화 시작'}
          </span>
        </div>

        {/* Right: Register New Object */}
        <div className="flex flex-col items-center">
          <button
            id="register-object-btn"
            onClick={onRegisterObject}
            className="w-14 h-14 rounded-full bg-[#f4f3ee] border border-gray-200/80 flex items-center justify-center text-gray-700 hover:bg-[#eae8e0] active:scale-95 transition-all"
            title="새로운 시각 사물 등록"
          >
            <div className="relative">
              <Camera className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#255f4e] rounded-full border-2 border-[#f4f3ee]" />
            </div>
          </button>
          <span className="text-[12px] font-semibold text-gray-800 mt-1.5 tracking-tight">
            사물 등록
          </span>
        </div>
      </div>
    </div>
  );
};
