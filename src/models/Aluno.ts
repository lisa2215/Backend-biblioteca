// Diagrama de classe para representar o Aluno

import { DatabaseError } from "pg";
import { DataBaseModel } from "./DataBaseModel";
const database = new DataBaseModel().pool;

export class Aluno {
    
    //Atributos
    private idAluno: number = 0;
    private ra:  string = ``;
    private nome:  string;
    private sobrenome:  string;
    private dataNascimento: Date;
    private endereco:  string;
    private email:  string;
    private celular:  string;
   


    /**
     * Construtor da classe aluno
     * @param nome   
     * @param sobrenome   
     * @param dataNascimento   
     * @param endereco   
     * @param email   
     * @param celular   
     */
    
    constructor(        
        nome: string,
        sobrenome: string,
        dataNascimento: Date,
        endereco: string,
        email: string, 
        celular: string,
    ) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.email = email;
        this.celular = celular;
    }

     /* Métodos get e set */
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
    public getNome(): string {
        return this.nome;
    }

    /**
     * @param nome 
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

     /**
     * @returns 
     */

     public getSobrenome(): string {
        return this.sobrenome;
    }

    /**
     * @param sobrenome 
     */
    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    /**
     * @returns {Date}
     */
    public getDataNascimento(): Date {
        return this.dataNascimento;
    }

    /**
     *
     * @param dataNascimento 
     */
    public setDataNascimento(dataNascimento: Date): void {
        this.dataNascimento = dataNascimento;
    }

    /**
     * @returns 
     */
    public getEndereco(): string {
        return this.endereco;
    }

    /**
     * @param endereco 
     */
    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    /**
     * @returns
     */
    public getEmail (): string {
        return this.email;
    }

    /**
     * @param email 
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
     * @returns
     */
    public getCelular(): string {
        return this.celular;
    }

    /**
     * @param celular 
     */
    public setCeular(celular: string): void {
        this.celular = celular;
    }

    /**
     * @returns
     */
    public getRA(): string {
        return this.ra;
    }

    /**
     * @param ra 
     */
    public setRA(ra: string): void {
        this.ra = ra;
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

   
  static async listagemAluno(): Promise<Array<Aluno> | null> {
    // objeto para armazenar a lista de Aluno
    const listaDeAluno: Array<Aluno> = [];

    try {
        // query de consulta ao banco de dados
        const querySelectAluno = `SELECT * FROM Aluno;`;

        // fazendo a consulta e guardando a resposta
        const respostaBD = await database.query(querySelectAluno);

        // usando a resposta para instanciar um objeto do tipo aluno
        respostaBD.rows.forEach((linha) => {
            // instancia (cria) objeto Aluno
            let novoAluno = new Aluno(
                linha.nome,
                linha.sobrenome,
                linha.dataNascimento,
                linha.endereco,
                linha.email,
                linha.celular,
            );

            // atribui o ID objeto
            novoAluno.setIdAluno(linha.id_Aluno);

            // adiciona o objeto na lista
            listaDeAluno.push(novoAluno);
            });

        // retorna a lista de Alunos
        return listaDeAluno;
    } catch (error) {
        console.log('Erro ao buscar lista de alunos. Verifique os logs para mais detalhes.');
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
     * @param {Aluno} Aluno - Objeto contendo os dados do Aluno que será cadastrado. O objeto `Aluno`
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

  

