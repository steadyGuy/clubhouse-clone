import socketio, { Socket } from 'socket.io-client';
import { useRef } from 'react';

export const useSocket = () => {
  const socketRef = useRef<Socket>()
  socketRef.current = socketio('ws://localhost:3001');

  return socketRef.current;
}