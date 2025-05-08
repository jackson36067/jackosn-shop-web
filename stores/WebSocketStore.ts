// stores/useWebSocketStore.ts
import { create } from "zustand";

interface WebSocketState {
  socket: WebSocket | null;
  isOpen: boolean;
  messages: string[];
  connect: (url: string) => void;
  sendMessage: (message: string) => void;
  close: () => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  socket: null,
  isOpen: false,
  messages: [],

  connect: (url: string) => {
    const existingSocket = get().socket;
    if (existingSocket) {
      console.warn("WebSocket 已连接");
      return;
    }

    const ws = new WebSocket(url);

    ws.onopen = () => {
      set({ isOpen: true });
      console.log("✅ WebSocket 已连接");
    };

    ws.onmessage = (event: MessageEvent) => {
      set((state) => ({
        messages: [...state.messages, event.data],
      }));
    };

    ws.onerror = (error: Event) => {
      console.error("❌ WebSocket 错误:", error);
    };

    ws.onclose = (event) => {
      console.log("🔌 WebSocket 已关闭:", event.code, event.reason);
      set({ socket: null, isOpen: false });
    };

    set({ socket: ws });
  },

  sendMessage: (message: string) => {
    const socket = get().socket;
    const isOpen = get().isOpen;
    if (socket && isOpen) {
      socket.send(message);
    } else {
      console.warn("WebSocket 未连接，无法发送消息");
    }
  },

  close: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
    }
    set({ socket: null, isOpen: false });
  },
}));
