export interface DetectedObject {
  id: string;
  name: string;
  category: 'person' | 'object' | 'book';
  confidence: number;
  box: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  borderColor: string;
  bgColor: string;
  tagColor: string;
  iconType: 'user' | 'tumbler' | 'book';
  details?: {
    location: string;
    firstSeen: string;
    attributes: string[];
  };
}

export interface StreamMetrics {
  resolution: string;
  latencyMs: number;
  fps: number;
  tempC: number;
  bitrateMbps: number;
  sensor: string;
  status: string;
  nightVision: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  highlights?: string[];
  confidence?: number;
  timestamp: string;
}

export type TabType = 'vision' | 'memory' | 'security' | 'settings';
