import React from 'react';
import { Video, Layers, Shield, Settings } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const tabs = [
    {
      id: 'vision' as TabType,
      label: '라이브 비전',
      icon: Video,
    },
    {
      id: 'memory' as TabType,
      label: '시각 기억',
      icon: Layers,
    },
    {
      id: 'security' as TabType,
      label: '스마트 보안',
      icon: Shield,
    },
    {
      id: 'settings' as TabType,
      label: '기기 설정',
      icon: Settings,
    },
  ];

  return (
    <nav
      id="bottom-nav-bar"
      className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/70 py-2.5 px-4 z-40"
    >
      <div className="flex items-center justify-around max-w-[430px] mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-xl active:scale-95 ${
                isActive
                  ? 'text-[#245b4b]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'stroke-[2.4] scale-105' : 'stroke-[1.8]'
                }`}
              />
              <span
                className={`text-[11px] tracking-tight ${
                  isActive ? 'font-bold' : 'font-normal'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
