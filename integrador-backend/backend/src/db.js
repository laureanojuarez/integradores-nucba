import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error(
        "❌ MONGO_URL no está definida en las variables de entorno"
      );
    }

    const options = {
      serverSelectionTimeoutMS: 30000, // 30 segundos
      socketTimeoutMS: 45000, // 45 segundos
      maxPoolSize: 10, // Mantener hasta 10 conexiones en el pool
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    };

    await mongoose.connect(process.env.MONGO_URL, options);
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("🔗 Mongoose conectado a MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Error de conexión MongoDB:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ Mongoose desconectado de MongoDB");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔒 Conexión MongoDB cerrada por terminación de la aplicación");
  process.exit(0);
});
