import { Server } from "socket.io";

let io: Server | null = null;

export const setSocketInstance = (socketInstance: Server) => {
  io = socketInstance;
};

export const emitSocketEvent = (event: string, data: any) => {
  if (io) {
    io.emit(event, data);
  } else {
    console.error("Socket.IO instance is not set!");
  }
};
