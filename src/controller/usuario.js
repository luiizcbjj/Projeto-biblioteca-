import prisma from "../db/prisma.js";

export async function criarUsuario(req, res) {
  const { username, password } = req.body;

  if (!username || !password || password.length < 4) {
    return res.status(400).json({ mensagem: "Dados inválidos ou senha muito curta" });
  }

  try {
    // Verifica se é o primeiro usuário
    const totalUsuarios = await prisma.usuario.count();
    const isAdmin = totalUsuarios === 0; // Primeiro usuário será admin

    const usuarioCriado = await prisma.usuario.create({
      data: { username, password, isAdmin },
    });

    res.json({ 
      mensagem: `Usuário criado com sucesso${isAdmin ? " e é admin" : ""}`, 
      id: usuarioCriado.id 
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ mensagem: "Erro ao criar usuário ou usuário já existe" });
  }
}
