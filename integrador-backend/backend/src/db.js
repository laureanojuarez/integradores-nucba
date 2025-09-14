import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Debug: verificar que la variable existe
    console.log("🔍 MONGO_URL existe:", !!process.env.MONGO_URL);
    console.log("🔍 NODE_ENV:", process.env.NODE_ENV);

    if (!process.env.MONGO_URL) {
      throw new Error(
        "❌ MONGO_URL no está definida en las variables de entorno"
      );
    }

    console.log("🔄 Conectando a MongoDB...");

    // Opciones actualizadas y compatibles
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
    console.log("✅ MongoDB conectado exitosamente");
    console.log("📍 Cluster:", mongoose.connection.host);
    console.log("📍 Database:", mongoose.connection.name);
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

// Cerrar conexión cuando el proceso termina
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔒 Conexión MongoDB cerrada por terminación de la aplicación");
  process.exit(0);
});
