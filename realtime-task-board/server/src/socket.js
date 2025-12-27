const Task = require("./models/Task");

function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("🔗 User connected:", socket.id);
    socket.join("board:main");

    socket.on("task:create", async (payload, cb) => {
      try {
        const task = await Task.create(payload);
        io.to("board:main").emit("task:created", task);
        cb?.(task);
      } catch (error) {
        cb?.({ error: error.message });
      }
    });

    socket.on("task:update", async ({ id, updates }, cb) => {
      try {
        const task = await Task.findByIdAndUpdate(id, updates, { new: true });
        io.to("board:main").emit("task:updated", task);
        cb?.(task);
      } catch (error) {
        cb?.({ error: error.message });
      }
    });

    socket.on("task:delete", async (id, cb) => {
      try {
        await Task.findByIdAndDelete(id);
        io.to("board:main").emit("task:deleted", id);
        cb?.({ success: true });
      } catch (error) {
        cb?.({ error: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("🔌 User disconnected:", socket.id);
    });
  });
}

module.exports = socketHandler;

