import React from 'react';
import { Layers, Shield, Settings, CheckCircle2, Clock, Cpu, HardDrive, Wifi, Bell, ShieldCheck, UserCheck } from 'lucide-react';
import { StreamMetrics } from '../types';

interface OtherTabsProps {
  currentTab: 'memory' | 'security' | 'settings';
  metrics: StreamMetrics;
  onBackToVision: () => void;
}

export const OtherTabs: React.FC<OtherTabsProps> = ({ currentTab, metrics, onBackToVision }) => {
  if (currentTab === 'memory') {
    const memoryItems = [
      {
        id: '1',
        title: '디자인 기획 노트',
        time: '오늘 09:14 (방금 전)',
        confidence: 89,
        category: '문서/도서',
        note: '펼쳐진 상태로 감지, 책상 우측 하단 위치',
      },
      {
        id: '2',
        title: '스마트 텀블러',
        time: '오늘 08:52 (22분 전)',
        confidence: 94,
        category: '스마트 소품',
        note: '수분 섭취 알림 연동 중 (블루베리 퍼플)',
      },
      {
        id: '3',
        title: '민우 (사용자)',
        time: '오늘 08:30 (44분 전)',
        confidence: 98,
        category: '등록된 사용자',
        note: '정면 얼굴 ID 및 책상 착석 확인',
      },
      {
        id: '4',
        title: '무선 마우스 & 패드',
        time: '어제 19:40',
        confidence: 96,
        category: '주변 기기',
        note: '배터리 82% 잔여 기록',
      },
    ];

    return (
      <div className="px-4 py-3 space-y-4 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e3f0eb] flex items-center justify-center text-[#255f4e]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">시각 기억 보관소</h2>
              <p className="text-[11px] text-gray-500">라즈베리파이가 최근 학습하고 기억한 사물 목록</p>
            </div>
          </div>
          <button
            onClick={onBackToVision}
            className="text-[11px] font-semibold text-[#255f4e] bg-[#edf6f2] px-2.5 py-1 rounded-full hover:bg-[#dfeee7]"
          >
            라이브 뷰로 이동
          </button>
        </div>

        <div className="space-y-2.5">
          {memoryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-2xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-gray-900">{item.title}</span>
                <span className="text-[11px] font-semibold text-[#255f4e] bg-[#edf6f2] px-2 py-0.5 rounded-full">
                  {item.confidence}% 정확도
                </span>
              </div>
              <p className="text-[11px] text-gray-600">{item.note}</p>
              <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-gray-50">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {item.time}
                </span>
                <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentTab === 'security') {
    return (
      <div className="px-4 py-3 space-y-4 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">스마트 비전 보안</h2>
              <p className="text-[11px] text-gray-500">라즈베리파이 5 침입 감지 및 얼굴 승인</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            안전 보호 중
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold text-gray-800">등록된 인증 사용자</h3>
          <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#255f4e] text-white flex items-center justify-center font-bold text-xs">
                민우
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">민우 (본인 / 소유자)</p>
                <p className="text-[10px] text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" /> 얼굴 ID 일치도 98%
                </p>
              </div>
            </div>
            <span className="text-[10px] text-gray-500 bg-white px-2 py-1 rounded-lg border border-gray-200">
              승인됨
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs space-y-2">
          <h3 className="text-xs font-bold text-gray-800">보안 구역 규칙</h3>
          <div className="space-y-1.5 text-xs text-gray-600">
            <label className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
              <span>미인증 인물 감지 시 경고음</span>
              <input type="checkbox" defaultChecked className="accent-[#255f4e] w-4 h-4" />
            </label>
            <label className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
              <span>야간 적외선 모드 자동 전환</span>
              <input type="checkbox" defaultChecked className="accent-[#255f4e] w-4 h-4" />
            </label>
            <label className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
              <span>소지품 이동 시 푸시 알림</span>
              <input type="checkbox" defaultChecked className="accent-[#255f4e] w-4 h-4" />
            </label>
          </div>
        </div>
      </div>
    );
  }

  // Settings
  return (
    <div className="px-4 py-3 space-y-4 animate-in fade-in duration-200">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
          <Settings className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-900">라즈베리파이 5 시스템 설정</h2>
          <p className="text-[11px] text-gray-500">하드웨어 사양 및 AI 비전 파라미터</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-[#255f4e]" /> 시스템 텔레메트리
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <span className="text-[10px] text-gray-500 block">SoC 온도</span>
            <span className="font-bold text-gray-800">{metrics.tempC}°C (정상)</span>
          </div>
          <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <span className="text-[10px] text-gray-500 block">비전 프레임</span>
            <span className="font-bold text-gray-800">{metrics.fps} FPS / 24ms</span>
          </div>
          <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <span className="text-[10px] text-gray-500 block">카메라 센서</span>
            <span className="font-bold text-gray-800">Sony IMX708 (12MP)</span>
          </div>
          <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <span className="text-[10px] text-gray-500 block">AI 비전 가속</span>
            <span className="font-bold text-gray-800">Gemini 2.0 Flash NPU</span>
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <button
          onClick={onBackToVision}
          className="bg-[#255f4e] hover:bg-[#1e4e40] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs"
        >
          실시간 카메라 화면으로 돌아가기
        </button>
      </div>
    </div>
  );
};
