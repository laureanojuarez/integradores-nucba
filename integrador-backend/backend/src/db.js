import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 segundos
      socketTimeoutMS: 45000, // 45 segundos
      bufferCommands: false,
      bufferMaxEntries: 0,
    };

    await mongoose.connect(process.env.MONGO_URL, options);
    console.log("✅ MongoDB conectado exitosamente");
    console.log("📍 Cluster:", mongoose.connection.host);
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

// Manejar eventos de conexión
mongoose.connection.on("connected", () => {
  console.log("🔗 Mongoose conectado a MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Error de conexión MongoDB:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ Mongoose desconectado de MongoDB");
});
