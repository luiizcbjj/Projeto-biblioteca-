import express from "express";
import { criarUsuario } from "../controller/usuario.js";

const rotaAuth = express.Router();

rotaAuth.post("/registro", criarUsuario);

export default rotaAuth;
