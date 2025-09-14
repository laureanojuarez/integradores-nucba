import app from "./app.js";
import { connectDB } from "./db.js";
import "dotenv/config";

// Debug completo
console.log("🔍 === DEBUG VARIABLES DE ENTORNO ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("MONGO_URL existe:", !!process.env.MONGO_URL);
console.log("JWT_SECRET existe:", !!process.env.JWT_SECRET);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("=".repeat(40));

const PORT = process.env.PORT || 10000;

async function main() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`🌍 Entorno: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
}

main();
