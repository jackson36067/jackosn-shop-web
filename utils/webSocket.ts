import { useCallback, useState } from "react";

interface UseWebSocketReturn {
  isOpen: boolean; // WebSocket 连接是否打开
  messages: string[]; // 接收到的消息列表
  sendMessage: (message: string) => void; // 发送消息的函数
  connect: (url: string) => void; // 手动触发 WebSocket 连接
}

const useWebSocket = (): UseWebSocketReturn => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 创建 connect 方法用于手动触发 WebSocket 连接
  const connect = useCallback((url: string) => {
    const ws = new WebSocket(url);
    setSocket(ws);

    // 监听 WebSocket 连接状态
    ws.onopen = () => {
      setIsOpen(true);
    };

    // 监听 WebSocket 消息
    ws.onmessage = (event: MessageEvent) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // 监听 WebSocket 错误
    ws.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
    };

    // 监听 WebSocket 关闭
    ws.onclose = () => {
      setIsOpen(false);
      console.log("WebSocket 被关闭: ");
    };

    // 清理 WebSocket 连接
    return () => {
      ws.close();
    };
  }, []);
  // 发送消息
  const sendMessage = (message: string): void => {
    if (socket && isOpen) {
      socket.send(message);
    }
  };

  return {
    isOpen,
    messages,
    sendMessage,
    connect, // 返回 connect 方法
  };
};

export default useWebSocket;
