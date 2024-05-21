import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./db.js"; // Importando o arquivo de conexão com o banco de dados

import usersRoutes from "./routes/users.js";
import tasksRoutes from "./routes/tasks.js";

const app = express();
const PORT = 5000;

// Conectando ao banco de dados
connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/tasks", tasksRoutes);
app.get("/", (req, res) => res.send("Bem-vindo"));
app.all("*", (req, res) => res.send("Sem resposta possível"));

app.listen(PORT, () => console.log(`Server rodando em: http://localhost:${PORT}`));