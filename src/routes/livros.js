import express from "express";
import { verificarAdmin } from "../middlewares/admin.js";
import {
  pegarTodosLivros,
  pegarLivroPorId,
  adicionarLivro,
  modificarLivro,
  removerLivro,
  alugarLivro,
  retornarLivro,
} from "../controller/livros.js";

const rotaLivros = express.Router();

// Rotas públicas
rotaLivros.get("/", pegarTodosLivros);
rotaLivros.get("/:id", pegarLivroPorId);

// Rotas protegidas
rotaLivros.post("/", verificarAdmin, adicionarLivro);
rotaLivros.patch("/:id", verificarAdmin, modificarLivro);
rotaLivros.delete("/:id", verificarAdmin, removerLivro);

// Empréstimo/Devolução
rotaLivros.post("/:id/alugar", alugarLivro);
rotaLivros.post("/:id/devolver", retornarLivro);

export default rotaLivros;
