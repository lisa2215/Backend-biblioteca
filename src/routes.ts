/*import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ mensagem: "Rota padrão" })
});
*/


import { Request, Response, Router } from "express";
import { LivroController } from "./controller/LivroController";
import { AlunoController } from "./controller/AlunoController";
import { EmprestimoController } from "./controller/EmprestimoController"

// Cria um roteador
const router = Router();

// Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, mundo!" });
});

/* 
* ROTAS PARA LIVROS
*/ 
// Rota para listar os livro
router.get('/lista/livro', LivroController.todos);


// Rota para cadastrar um novo carro
//router.post("/novo/livro", LivroController.novo);

/* 
* ROTAS PARA ALUNOS
*/ 
// Rota para listar os alunos
//router.get("/lista/aluno", AlunoController.todos);
// Rota para cadastrar um novo aluno
//router.post("/novo/aluno", AlunoController.novo);

/* 
* ROTAS PARA EMPRÉSTIMO
*/ 
// Rota para listar os empréstimo
//router.get("/lista/emprestimo", EmprestimoController.todos);
// Rota para cadastrar um novo empréstimo
//router.post("/novo/emprestimo", EmprestimoController.novo);


// exportando as rotas
export { router };