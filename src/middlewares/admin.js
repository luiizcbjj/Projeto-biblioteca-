export function verificarAdmin(req, res, next) {
  if (req.usuario?.isAdmin) return next();
  return res.status(403).json({ mensagem: "Acesso negado: apenas admins" });
}
