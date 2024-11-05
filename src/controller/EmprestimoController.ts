import { Request, Response } from "express";
import { Emprestimo } from "..//models/Emprestimo";

interface EmprestimoDTO {
    idAluno: string,
    idLivro: string,
    dataEmprestimo: Date,
    dataDevolucao: Date,
    statusEmp: string
}

/**
 * A classe `EmprestimoController` estende a classe `Emprestimo` e é responsável por controlar as requisições relacionadas aos pedidos de emprestimo.
 * 
 * - Como um controlador dentro de uma API REST, esta classe gerencia as operações relacionadas ao recurso "emprestimo".
 * - Herdando de `Emprestimo`, ela pode acessar os métodos e propriedades da classe base.
 */
export class EmprestimoController extends Emprestimo {

    /**
     * Lista todos os emprestimos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de emprestimo em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de emprestimo.
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaEmprestimo = await Emprestimo.listagemEmprestimo();

            return res.status(200).json(listaEmprestimo);
        } catch (error) {
            console.log('Erro ao acessar listagem de Empréstimo');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de empréstimos" });
        }
    }

    /**
     * Cadastra um novo empréstimo.
     * 
     * Esta função recebe os dados de um empréstimo (objeto `EmprestimoDTO`) da requisição HTTP e os 
     * utiliza para cadastrar um novo empréstimo, chamando a função `cadastroEmprestimo` da classe `PedidoVenda`.
     * Retorna uma resposta JSON indicando o sucesso ou falha do cadastro, juntamente com uma mensagem apropriada.
     * 
     * @param {Request} req - Objeto da requisição HTTP contendo o corpo com os dados do emprestimo (`EmprestimoDTO`).
     * @param {Response} res - Objeto de resposta HTTP utilizado para enviar o status e mensagem ao aluno.
     * 
     * @returns {Promise<Response>} - Retorna uma resposta HTTP com status 200 e uma mensagem de sucesso se o cadastro for realizado com sucesso.
     *                                Em caso de erro, retorna uma resposta com status 400 e uma mensagem de erro.
     * 
     * @throws {Error} - Caso ocorra um erro durante o processo de cadastro, o erro é registrado no console e uma resposta de erro é enviada.
     */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const emprestimoRecebido: EmprestimoDTO = req.body;

            const repostaClasse = await Emprestimo.cadastroEmprestimo(emprestimoRecebido.dataEmprestimo,
                                                                    emprestimoRecebido.dataDevolucao,
                                                                    emprestimoRecebido.statusEmp);

            if (repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Empréstimo cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o empréstimo. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o empréstimo. ${error}`);
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o empréstimo. Entre em contato com o administrador do sistema." });
        }
    }
}