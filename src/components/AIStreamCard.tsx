import React, { useState } from 'react';
import { Bot, User, Sparkles, Send } from 'lucide-react';
import { ChatMessage } from '../types';

interface AIStreamCardProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isAiResponding: boolean;
}

export const AIStreamCard: React.FC<AIStreamCardProps> = ({
  messages,
  onSendMessage,
  isAiResponding,
}) => {
  const [inputText, setInputText] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const quickPrompts = [
    '텀블러 수분량 확인해줘',
    '기획 노트 텍스트 읽어줘',
    '책상 정리 상태 어때?',
  ];

  return (
    <div className="px-4 mt-3">
      <div
        id="ai-awareness-stream-card"
        className="bg-white rounded-[24px] p-4 border border-gray-100/90 shadow-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#e3f0eb] flex items-center justify-center text-[#256351]">
              <Bot className="w-4 h-4" />
            </div>
            <h2 className="text-[14px] font-bold text-gray-900 tracking-tight">
              AI 상황 인지 스트림
            </h2>
          </div>

          <div className="bg-[#edf6f2] text-[#245e4c] text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#245e4c]" />
            <span>시각 기억 동기화 완료</span>
          </div>
        </div>

        {/* Conversation Stream */}
        <div className="pt-3.5 space-y-3">
          {/* User Bubble (Right) */}
          <div className="flex items-start justify-end gap-2">
            <div className="bg-[#f4f3ee] text-gray-800 text-[13px] rounded-2xl rounded-tr-xs px-3.5 py-2.5 leading-relaxed max-w-[82%] font-normal shadow-2xs">
              "안녕 Talk to Me, 지금 내 책상에 뭐가 보이는지 확인해줘."
            </div>
            <div className="w-7 h-7 rounded-full bg-gray-200/80 flex items-center justify-center text-gray-600 shrink-0 mt-0.5">
              <User className="w-3.5 h-3.5 text-gray-700" />
            </div>
          </div>

          {/* AI Response Bubble (Left) */}
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full bg-[#e1ede8] flex items-center justify-center text-[#235b4b] shrink-0 mt-0.5">
              <Bot className="w-4 h-4" />
            </div>

            <div className="flex-1">
              <div className="bg-white border border-emerald-100/80 rounded-2xl rounded-tl-xs p-3.5 text-[13px] text-gray-800 leading-relaxed shadow-2xs">
                "네, 민우님! 방금 펼치신{' '}
                <span className="text-[#2b6b58] font-bold underline decoration-emerald-400 decoration-1 underline-offset-2">
                  디자인 기획 노트
                </span>
                와{' '}
                <span className="text-[#385e78] font-bold underline decoration-blue-400 decoration-1 underline-offset-2">
                  스마트 텀블러
                </span>
                를 감지했습니다. 연결된{' '}
                <span className="text-[#256351] font-bold">라즈베리 파이 5</span> 연동 모듈을 바로 확인해 드릴까요?"
              </div>

              {/* Status info under response */}
              <div className="text-[11px] text-gray-400 mt-1.5 pl-1 flex items-center gap-1.5">
                <span>98% 신뢰도 응답</span>
                <span>•</span>
                <span>방금 전 수신됨</span>
              </div>
            </div>
          </div>

          {/* Extra dynamically added messages if any */}
          {messages.slice(2).map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${
                msg.sender === 'user' ? 'justify-end' : ''
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-[#e1ede8] flex items-center justify-center text-[#235b4b] shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`text-[13px] leading-relaxed p-3 max-w-[85%] rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-[#f4f3ee] text-gray-800 rounded-tr-xs'
                    : 'bg-white border border-emerald-100/80 rounded-tl-xs shadow-2xs'
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-gray-200/80 flex items-center justify-center text-gray-600 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-gray-700" />
                </div>
              )}
            </div>
          ))}

          {isAiResponding && (
            <div className="flex items-center gap-2 pl-9">
              <div className="bg-[#f2f7f4] border border-emerald-100 rounded-full px-3 py-1 text-xs text-[#245e4c] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#245e4c] animate-ping" />
                <span>라즈베리파이 비전 센서 분석 중...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Question Chips Toggle */}
        <div className="mt-3 pt-2 border-t border-gray-100/80 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(prompt)}
              className="text-[11px] font-medium text-gray-600 bg-gray-50 hover:bg-[#edf6f2] hover:text-[#255f4e] border border-gray-200/60 rounded-full px-2.5 py-1 whitespace-nowrap transition-colors"
            >
              "{prompt}"
            </button>
          ))}
          <button
            onClick={() => setShowInput(!showInput)}
            className="text-[11px] font-semibold text-[#255f4e] px-1 hover:underline whitespace-nowrap"
          >
            {showInput ? '닫기' : '+ 질문'}
          </button>
        </div>

        {/* Optional text input expandable form */}
        {showInput && (
          <form onSubmit={handleSubmit} className="mt-2.5 flex items-center gap-1.5">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Talk to Me에게 비전 질문하기..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#2b6b58]"
            />
            <button
              type="submit"
              className="p-1.5 bg-[#255f4e] text-white rounded-xl active:scale-95 transition-transform"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
