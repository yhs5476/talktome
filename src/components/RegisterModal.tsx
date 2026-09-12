import React, { useState } from 'react';
import { X, Camera, Check } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (name: string, category: string) => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onRegister,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('소품');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onRegister(name.trim(), category);
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-[28px] p-5 shadow-2xl border border-gray-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e3f0eb] flex items-center justify-center text-[#255f4e]">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">새 사물 등록하기</h3>
              <p className="text-[11px] text-gray-500">라즈베리파이 시각 기억에 사물을 추가합니다</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              사물 이름
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 무선 이어폰, 스마트폰, 안경"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#255f4e]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              카테고리
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {['스마트 소품', '문서/도서', '개인 소지품'].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`py-1.5 text-[11px] rounded-lg border font-medium transition-colors ${
                    category === cat
                      ? 'bg-[#edf6f2] border-[#255f4e] text-[#255f4e]'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#f8f7f2] p-3 rounded-xl border border-gray-200/60 text-[11px] text-gray-600 flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#255f4e] shrink-0" />
            <span>카메라 뷰 중앙에 사물을 두고 [등록 완료]를 누르면 시각 모델에 학습됩니다.</span>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              className="flex-1 bg-[#255f4e] hover:bg-[#1e4e40] text-white py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              등록 완료
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-xs"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
