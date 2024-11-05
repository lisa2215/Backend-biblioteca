import { Pool } from "pg";
import { DataBaseModel } from "./DataBaseModel";
const database = new DataBaseModel().pool;

export class Emprestimo {
    
    //Atributos
    private idEmprestimo: number = 0;
    private idAluno: number = 0;
    private idLivro: number = 0;
    private dataEmprestimo:  Date;
    private dataDevolucao: Date;
    private statusEmprestimo:  string;



    /**
     * Construtor da classe aluno
     * @param dataEmprestimo   
     * @param dataDevolucao   
     * @param statusEmprestimo     
     */
    
    constructor(
        idAluno: number,
        idLivro: number,
        dataEmprestimo: Date,
        dataDevolucao: Date,
        statusEmprestimo: string,

    ) {
        this.idAluno= idAluno;
        this.idLivro= idLivro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.statusEmprestimo = statusEmprestimo;
    }

    /* Métodos get e set */
    /**
     * @returns 
     */

    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    /**
     * @param idEmprestimo 
     */
    public setIdEmprestimo(idEmprestimo: number): void {
        this.idEmprestimo = idEmprestimo;
    }

    /**
     * @returns 
     */

    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * @param idAluno 
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * @returns 
     */

    public getIdLivro(): number {
        return this.idLivro;
    }

    /**
     * @param idLivro 
     */
    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    /**
     * @returns {Date}
     */
    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    /**
     *
     * @param dataEmprestimo 
     */
    public setDataEmprestimo(dataEmprestimo: Date): void {
        this.dataEmprestimo = dataEmprestimo;
    }

    /**
     * @returns {Date}
     */
    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    /**
     *
     * @param dataDevolucao 
     */
    public setDataDevolucao(dataDevolucao: Date): void {
        this.dataDevolucao = dataDevolucao;
    }

    /**
     * @returns
     */
    public getStatusEmpestimo(): string {
        return this.statusEmprestimo;
    }

    /**
     * @param statusEmprestimo 
     */
    public setStatusEmprestimo(statusEmprestimo: string): void {
        this.statusEmprestimo = statusEmprestimo;
    }

    /**
     * Busca e retorna uma lista de Aluno do banco de dados.
     * @returns Um array de objetos do tipo `Aluno em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todas as informações da tabela "Aluno".
     * - Os dados retornados do banco de dados são usados para instanciar objetos da classe `Aluno`.
     * - Cada livro é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */

   
  static async listagemEmprestimo(): Promise<Array<Emprestimo> | null> {
    // objeto para armazenar a lista de Emprestimo
    const listaDeEmprestimo: Array<Emprestimo> = [];

    try {
        // query de consulta ao banco de dados
        const querySelectEmprestimo = `SELECT * FROM Emprestimo;`;

        // fazendo a consulta e guardando a resposta
        const respostaBD = await database.query(querySelectEmprestimo);

        // usando a resposta para instanciar um objeto do tipo aluno
        respostaBD.rows.forEach((linha) => {
            // instancia (cria) objeto Aluno
            let novoEmprestimo = new Emprestimo(
                linha.dataEmprestimo,
                linha.dataDevolucao,
                linha.statusEmprestimo,
                linha.endereco,
                linha.email,

            );

            // atribui o ID objeto
            novoEmprestimo.setIdEmprestimo(linha.id_Emprestimo);

            // adiciona o objeto na lista
            listaDeEmprestimo.push(novoEmprestimo);
            });

        // retorna a lista de Alunos
        return listaDeEmprestimo;
    } catch (error) {
        console.log('Erro ao buscar lista de emprestimo. Verifique os logs para mais detalhes.');
        console.log(error);
        return null;
    }


/**
     * Realiza o cadastro de um aluno no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Aluno` e insere seus dados (marca, modelo, ano e cor)
     * na tabela `aluno` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Emprestimo} Emprestimo - Objeto contendo os dados do Aluno que será cadastrado. O objeto `Aluno`
     *                        deve conter os métodos `getMarca()`, `getModelo()`, `getAno()` e `getCor()`
     *                        que retornam os respectivos valores do aluno.
     * @returns {Promise<boolean>} - Retorna `true` se o aluno foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */

}
}