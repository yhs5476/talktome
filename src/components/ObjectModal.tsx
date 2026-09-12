import React from 'react';
import { X, CheckCircle, Tag, Clock, HelpCircle, MessageSquare } from 'lucide-react';
import { DetectedObject } from '../types';

interface ObjectModalProps {
  object: DetectedObject | null;
  onClose: () => void;
  onAskAboutObject: (name: string) => void;
}

export const ObjectModal: React.FC<ObjectModalProps> = ({
  object,
  onClose,
  onAskAboutObject,
}) => {
  if (!object) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-[28px] p-5 shadow-2xl border border-gray-100 space-y-4 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#255f4e]" />
            <h3 className="text-base font-bold text-gray-900">{object.name}</h3>
            <span className="bg-[#edf6f2] text-[#245e4c] font-semibold text-xs px-2 py-0.5 rounded-full">
              {object.confidence}% 일치
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-2xl p-3.5 space-y-2 text-xs text-gray-700">
          <div className="flex justify-between py-1 border-b border-gray-200/60">
            <span className="text-gray-500">객체 분류</span>
            <span className="font-semibold text-gray-800">
              {object.category === 'person'
                ? '등록된 사용자 (얼굴 ID)'
                : object.category === 'book'
                ? '문서 / 노트'
                : '스마트 소품'}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200/60">
            <span className="text-gray-500">라즈베리파이 센서</span>
            <span className="font-semibold text-gray-800">IMX708 와이드 앵글 (12MP)</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-500">현재 상태</span>
            <span className="font-semibold text-emerald-700 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> 실시간 트래킹 중
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              onAskAboutObject(object.name);
              onClose();
            }}
            className="flex-1 bg-[#255f4e] hover:bg-[#1e4e40] text-white py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            이 사물에 대해 AI 질문하기
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-xs"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
