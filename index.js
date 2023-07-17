const dotenv = require("dotenv");
dotenv.config({ path: "./.config.env" });

const { ecommercedb } = require("./models/db");

// connect and sync db
ecommercedb
  .sync({ force: false })
  .then(() => console.log("synced ecommercedb successfully!"))
  .catch((err) => console.log("unable to sync ecommercedb!", err));

ecommercedb
  .authenticate()
  .then(() => console.log("connected ecommercedb successfully!"))
  .catch((err) => console.log("unable to connect ecommercedb!", err));

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.stack);
  process.exit(1);
});

const app = require("./app");

// declaring the port variable
const PORT = process.env.PORT || 8000;

// setting up the express server
const server = app.listen(PORT, () => {
  console.log(`Server is awake on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.stack);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
