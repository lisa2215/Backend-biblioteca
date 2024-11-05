import { Request, Response } from "express";
import { Aluno } from "../models/Aluno";

interface AlunoDTO {
    ra:string,
    nome: string,
    sobrenome: string,
    dataNascimento: string,
    endereco: string,
    email: string,
    celular: string
}

/**
* A classe `AlunoController` estende a classe `Aluno` e é responsável por controlar as requisições relacionadas aos Alunos.
* 
* - Como um controlador em uma API REST, esta classe gerencia as operações relacionadas ao recurso "aluno".
* - Herdando de `Aluno`, ela pode acessar os métodos e propriedades da classe base.
*/
export class AlunoController extends Aluno {

    /**
     * Lista todos os Alunos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de Alunos em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de aluno.
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaDeAluno = await Aluno.listagemAlunos();
            console.log(listaDeAlunos);
            
            return res.status(200).json(listaDeAlunos);
        } catch (error) {
            console.log('Erro ao acessar listagem de alunos');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de alunos" });
        }
    }

    /**
     * Processa a requisição para cadastro de um novo aluno.
     * 
     * Esta função extrai os dados do alunos enviados no corpo da requisição e cria um objeto `Aluno` com essas informações.
     * Em seguida, chama o método `cadastroAluno` para inserir o Aluno no banco de dados. A função retorna uma resposta JSON 
     * indicando sucesso ou falha no cadastro, conforme o resultado da operação.
     * 
     * @param {Request} req - Objeto de requisição do Express, que contém os dados do Aluno no corpo (`body`).
     * @param {Response} res - Objeto de resposta do Express, usado para enviar a resposta HTTP de volta ao Aluno.
     * 
     * @returns {Promise<Response>} - Resposta HTTP JSON com uma mensagem de sucesso ou erro.
     * 
     * @throws {Error} - Em caso de erro, registra a mensagem no console e retorna um status 400 com uma mensagem JSON.
     */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface AlunoDTO
            const AlunoRecebido: AlunoDTO = req.body;

            // instanciando um objeto do tipo Aluno com as informações recebidas
            const novoAluno = new Aluno(AlunoRecebido.nome, AlunoRecebido.sobrenome, AlunoRecebido.dataNAscimento, AlunoRecebido.endereco, AlunoRecebido.email, AlunoRecebido.celular,);

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Aluno.cadastroAluno(novoAluno);

            // verifica a resposta da função
            if(repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Aluno cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o aluno. Entre em contato com o administrador do sistema."})
            } 
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar o aluno. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o aluno. Entre em contato com o administrador do sistema." });
        }
    }
}