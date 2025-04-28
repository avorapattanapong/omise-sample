import express from 'express';
import bodyParser from "body-parser";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";


const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
