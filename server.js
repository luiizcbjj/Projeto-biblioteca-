import express from "express";
import rotaLivros from "./src/routes/livros.js";
import rotaAuth from "./src/routes/auth.js";

const app = express();
app.use(express.json());

// Rotas aqui
app.use("/auth", rotaAuth);
app.use("/livros", rotaLivros);

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
