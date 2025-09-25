import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;
const IO = {
  init: (httpServer: HttpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: process.env.ORIGIN?.split(",") || "http://localhost:3000",
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("no socket");
    }
    return io;
  },
};

// ham lang nghe su kien cua socketio
export const getIOHandler = async function (petCurrent: any, petModel: any) {
  if (petCurrent) {
    const listPet = await petModel.find();
    // lang nghe su kien listPet tu client
    IO.getIO().emit("listPet", {
      listPet: listPet,
    });
  }
};

export default IO;
