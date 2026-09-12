import React, { useState } from 'react';
import { Header } from './components/Header';
import { VisionFeed } from './components/VisionFeed';
import { AIStreamCard } from './components/AIStreamCard';
import { VoiceControls } from './components/VoiceControls';
import { BottomNav } from './components/BottomNav';
import { ObjectModal } from './components/ObjectModal';
import { RegisterModal } from './components/RegisterModal';
import { OtherTabs } from './components/OtherTabs';
import { DetectedObject, StreamMetrics, ChatMessage, TabType } from './types';

export default function App() {
  // Stream & Hardware metrics matching screenshot
  const [metrics, setMetrics] = useState<StreamMetrics>({
    resolution: '1080P',
    latencyMs: 24,
    fps: 30,
    tempC: 42,
    bitrateMbps: 4.8,
    sensor: 'CAM V3 12MP (IMX708)',
    status: '정상 작동',
    nightVision: false,
  });

  // Detected Objects on desk
  const [objects, setObjects] = useState<DetectedObject[]>([
    {
      id: 'obj-user',
      name: '민우 (사용자)',
      category: 'person',
      confidence: 98,
      box: { top: '18%', left: '28%', width: '44%', height: '35%' },
      borderColor: '#2b6352',
      bgColor: 'rgba(43, 99, 82, 0.08)',
      tagColor: '#2b6352',
      iconType: 'user',
      details: {
        location: '중앙 상단',
        firstSeen: '10분 전',
        attributes: ['얼굴 ID 일치', '정면 시선', '소유자 프로필 승인'],
      },
    },
    {
      id: 'obj-tumbler',
      name: '스마트 텀블러',
      category: 'object',
      confidence: 94,
      box: { top: '49%', left: '13%', width: '25%', height: '28%' },
      borderColor: '#54738c',
      bgColor: 'rgba(84, 115, 140, 0.08)',
      tagColor: '#54738c',
      iconType: 'tumbler',
      details: {
        location: '좌측 하단',
        firstSeen: '25분 전',
        attributes: ['보라색 스테인리스', '수분 섭취 알림 연동'],
      },
    },
    {
      id: 'obj-notebook',
      name: '기획 노트',
      category: 'book',
      confidence: 89,
      box: { top: '55%', right: '14%', width: '34%', height: '28%' } as any,
      borderColor: '#8b82a8',
      bgColor: 'rgba(139, 130, 168, 0.08)',
      tagColor: '#8b82a8',
      iconType: 'book',
      details: {
        location: '우측 하단',
        firstSeen: '방금 전',
        attributes: ['디자인 기획서', '펼쳐진 상태', 'A5 그리드 노트'],
      },
    },
  ]);

  // Chat conversation
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'user',
      text: '안녕 Talk to Me, 지금 내 책상에 뭐가 보이는지 확인해줘.',
      timestamp: '방금 전',
    },
    {
      id: '2',
      sender: 'ai',
      text: '네, 민우님! 방금 펼치신 디자인 기획 노트와 스마트 텀블러를 감지했습니다. 연결된 라즈베리 파이 5 연동 모듈을 바로 확인해 드릴까요?',
      confidence: 98,
      timestamp: '방금 전',
    },
  ]);

  // App UI states
  const [currentTab, setCurrentTab] = useState<TabType>('vision');
  const [selectedZoom, setSelectedZoom] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [snapshotFlash, setSnapshotFlash] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(true);
  const [isMicOn, setIsMicOn] = useState<boolean>(true);
  const [isAiResponding, setIsAiResponding] = useState<boolean>(false);

  // Modals
  const [selectedObject, setSelectedObject] = useState<DetectedObject | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  // Snapshot flash handler
  const handleTakeSnapshot = () => {
    setSnapshotFlash(true);
    setTimeout(() => setSnapshotFlash(false), 250);
  };

  // Toggle Night Vision IR
  const handleToggleNightVision = () => {
    setMetrics((prev) => ({
      ...prev,
      nightVision: !prev.nightVision,
    }));
  };

  // Toggle Speaking / Voice Audio
  const handleToggleSpeaking = () => {
    setIsSpeaking((prev) => !prev);
    // Optional Web Speech synthesis feedback
    if (!isSpeaking && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('네, 민우님! 비전 분석을 계속합니다.');
      utterance.lang = 'ko-KR';
      window.speechSynthesis.speak(utterance);
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Send new message into stream
  const handleSendMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: '방금 전',
    };
    setMessages((prev) => [...prev, newMsg]);
    setIsAiResponding(true);
    setIsSpeaking(true);

    setTimeout(() => {
      let reply = '라즈베리 파이 실시간 카메라로 확인 결과, 책상 상단과 소지품 상태가 양호합니다.';
      if (text.includes('텀블러')) {
        reply = '스마트 텀블러가 안정적으로 거치되어 있으며, 마지막 기록 기준 수분 잔여량은 약 65%입니다.';
      } else if (text.includes('노트')) {
        reply = '디자인 기획 노트의 상단 제목 [Talk to Me 프로젝트 기획]이 시각 인식되었습니다.';
      } else if (text.includes('정리')) {
        reply = '현재 책상 위에는 사용자님, 텀블러, 기획 노트 3가지 주요 객체가 정돈되어 있습니다.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply,
          confidence: 96,
          timestamp: '방금 전',
        },
      ]);
      setIsAiResponding(false);

      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(reply);
        u.lang = 'ko-KR';
        window.speechSynthesis.speak(u);
      }
    }, 1200);
  };

  // Handle register new object
  const handleRegisterObject = (name: string, category: string) => {
    const newObj: DetectedObject = {
      id: `obj-${Date.now()}`,
      name,
      category: 'object',
      confidence: 91,
      box: { top: '35%', left: '40%', width: '22%', height: '22%' },
      borderColor: '#3c7562',
      bgColor: 'rgba(60, 117, 98, 0.1)',
      tagColor: '#3c7562',
      iconType: 'tumbler',
      details: {
        location: '중앙',
        firstSeen: '방금 전 등록됨',
        attributes: [category, '새로 등록된 시각 기억'],
      },
    };
    setObjects((prev) => [...prev, newObj]);
    handleSendMessage(`새로운 사물 [${name}]을 등록했어. 확인해줘.`);
  };

  return (
    <div className="min-h-screen bg-[#f6f5f0] text-gray-900 flex justify-center selection:bg-emerald-200">
      {/* Mobile App Viewport Container */}
      <main className="w-full max-w-[430px] min-h-screen bg-[#f6f5f0] flex flex-col justify-between shadow-2xl relative">
        {/* Main Scrollable Content */}
        <div className="flex-1 pb-4">
          {/* Header Bar */}
          <Header
            metrics={metrics}
            onToggleNightVision={handleToggleNightVision}
            onTakeSnapshot={handleTakeSnapshot}
            onToggleGrid={() => setShowGrid((prev) => !prev)}
            showGrid={showGrid}
            onOpenNotifications={() => alert('새 알림: 디자인 기획 노트가 시각 기억에 저장되었습니다.')}
            onOpenProfile={() => alert('사용자 프로필: 민우 (라즈베리파이 마스터 권한)')}
          />

          {/* Conditional View by Selected Tab */}
          {currentTab === 'vision' ? (
            <>
              {/* Live Vision Camera Viewport */}
              <VisionFeed
                metrics={metrics}
                objects={objects}
                onSelectObject={(obj) => setSelectedObject(obj)}
                selectedZoom={selectedZoom}
                onSelectZoom={(zoom) => setSelectedZoom(zoom)}
                showGrid={showGrid}
                snapshotFlash={snapshotFlash}
              />

              {/* AI Awareness Stream Card */}
              <AIStreamCard
                messages={messages}
                onSendMessage={handleSendMessage}
                isAiResponding={isAiResponding}
              />

              {/* Voice & Action Controls */}
              <VoiceControls
                isSpeaking={isSpeaking}
                onToggleSpeaking={handleToggleSpeaking}
                isMicOn={isMicOn}
                onToggleMic={() => setIsMicOn((prev) => !prev)}
                onRegisterObject={() => setIsRegisterOpen(true)}
              />
            </>
          ) : (
            <OtherTabs
              currentTab={currentTab}
              metrics={metrics}
              onBackToVision={() => setCurrentTab('vision')}
            />
          )}
        </div>

        {/* Bottom Fixed Navigation Bar */}
        <BottomNav
          currentTab={currentTab}
          onChangeTab={(tab) => setCurrentTab(tab)}
        />

        {/* Bounding Box Detail Modal */}
        <ObjectModal
          object={selectedObject}
          onClose={() => setSelectedObject(null)}
          onAskAboutObject={(name) => handleSendMessage(`${name}에 대해 자세히 설명해줘.`)}
        />

        {/* Register Object Modal */}
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onRegister={handleRegisterObject}
        />
      </main>
    </div>
  );
}
