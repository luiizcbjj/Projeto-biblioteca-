import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function pegarTodosLivros(req, res) {
  const livros = await db.Livro.findMany();
  res.json(livros);
}

export async function pegarLivroPorId(req, res) {
  const idLivro = parseInt(req.params.id);
  const livro = await db.Livro.findUnique({ where: { id: idLivro } });

  if (!livro) return res.status(404).json({ mensagem: "Livro não encontrado" });

  res.json(livro);
}

export async function adicionarLivro(req, res) {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ mensagem: "Dados insuficientes" });

  const novoLivro = await db.Livro.create({ data: { title, author } });
  res.json({ mensagem: "Livro adicionado com sucesso", livro: novoLivro });
}

export async function modificarLivro(req, res) {
  const idLivro = parseInt(req.params.id);
  const livroAtualizado = await db.Livro.update({ where: { id: idLivro }, data: req.body });
  res.json({ mensagem: "Livro atualizado", livro: livroAtualizado });
}

export async function removerLivro(req, res) {
  const idLivro = parseInt(req.params.id);
  await db.Livro.delete({ where: { id: idLivro } });
  res.json({ mensagem: "Livro removido com sucesso" });
}

export async function alugarLivro(req, res) {
  const idLivro = parseInt(req.params.id);
  const livro = await db.Livro.findUnique({ where: { id: idLivro } });

  if (!livro) return res.status(404).json({ mensagem: "Livro não encontrado" });
  if (!livro.available) return res.status(400).json({ mensagem: "Livro indisponível" });

  await db.Livro.update({ where: { id: idLivro }, data: { available: false } });
  res.json({ mensagem: "Livro emprestado com sucesso" });
}

export async function retornarLivro(req, res) {
  const idLivro = parseInt(req.params.id);
  const livro = await db.Livro.findUnique({ where: { id: idLivro } });

  if (!livro) return res.status(404).json({ mensagem: "Livro não encontrado" });

  await db.Livro.update({ where: { id: idLivro }, data: { available: true } });
  res.json({ mensagem: "Livro devolvido com sucesso" });
}
