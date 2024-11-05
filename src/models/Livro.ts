import { DataBaseModel } from "../models/DataBaseModel";

const database = new DataBaseModel().pool;
// Diagrama de classe para representar o Livro

export class Livro {
    
    //Atributos
    private idLivro: number = 0;
    private titulo: string;
    private autor: string;
    private editora: string;
    private anoPublicacao: string;
    private isbn: string;
    private quantTotal: number = 0;
    private quantDisponivel: number = 0;
    private valorAquisicao: number = 0;
    private statusLivroEmprestado: string;


    /**
     * Construtor da classe aluno
     * @param titulo   
     * @param autor   
     * @param editora   
     * @param anoPublicacao   
     * @param isbn   
     * @param quantTotal   
     * @param quantDisponivel   
     * @param valorAquisicao   
     * @param statusLivroEmprestado   
     */
    
    constructor(
        titulo: string,
        autor: string,
        editora: string,
        anoPublicacao: string,
        isbn: string,
        quantTotal: number,
        quantDisponivel: number,
        valorAquisicao: number,
        statusLivroEmprestado: string,
    ) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.anoPublicacao = anoPublicacao;
        this.isbn = isbn;
        this.quantTotal=quantTotal;
        this.quantDisponivel = quantDisponivel;
        this.valorAquisicao = valorAquisicao;
        this.statusLivroEmprestado = statusLivroEmprestado;
    }

     /* Métodos get e set */
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
     * @returns 
     */
    public getTitulo(): string {
        return this.titulo;
    }

    /**
     * @param titulo 
     */
    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

     /**
     * @returns 
     */

     public getAutor(): string {
        return this.autor;
    }

    /**
     * @param autor 
     */
    public setAutor(autor: string): void {
        this.autor = autor;
    }

    /**
     * @returns 
     */
    public getEditora(): string {
        return this.editora;
    }

    /**
     * @param editora 
     */
    public setEditora(editora: string): void {
        this.editora = editora;
    }

     /**
     * @returns 
     */

     public getAnoPublicacao(): string {
        return this.anoPublicacao;
    }

    /**
     * @param anoPublicacao 
     */
    public setAnoPublicacao(anoPublicacao: string): void {
        this.anoPublicacao = anoPublicacao;
    }

    /**
     * @returns 
     */
    public getISBN(): string {
        return this.isbn;
    }

    /**
     * @param isbn 
     */
    public setISBN(isbn: string): void {
        this.isbn = isbn;
    }

     /**
     * @returns 
     */

     public getQuantTotal(): number {
        return this.quantTotal;
    }

    /**
     * @param quantTotal 
     */
    public setQuantTotal(quantTotal: number): void {
        this.quantTotal = quantTotal;
    }

     /**
     * @returns 
     */

     public getQuantDisponivel(): number {
        return this.quantDisponivel;
    }

    /**
     * @param quantDisponivel 
     */
    public setQuantDisponivel(quantDisponivel: number): void {
        this.quantDisponivel = quantDisponivel;
    }

     /**
     * @returns 
     */

     public getValorAquisicao(): number {
        return this.valorAquisicao;
    }

    /**
     * @param valorAquisicao 
     */
    public setValorAquisicao(valorAquisicao: number): void {
        this.valorAquisicao = valorAquisicao;
    }

     /**
     * @returns 
     */

     public getStatusLivroEmprestado(): string {
        return this.statusLivroEmprestado;
    }

    /**
     * @param statusLivroEmprestado
     */
    public setStatusLivroEmprestado(statusLivroEmprestado: string): void {
        this.statusLivroEmprestado = statusLivroEmprestado;
    }

    /**
     * Busca e retorna uma lista de Livro do banco de dados.
     * @returns Um array de objetos do tipo `Livro` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todas as informações da tabela "livro".
     * - Os dados retornados do banco de dados são usados para instanciar objetos da classe `Livro`.
     * - Cada livro é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */

   
    static async listagemLivro(): Promise<Array<Livro> | null> {
    // objeto para armazenar a lista de Livro
    const listaDeLivro: Array<Livro> = [];

    try {
        // query de consulta ao banco de dados
        const querySelectLivro = `SELECT * FROM Livro;`;

        // fazendo a consulta e guardando a resposta
        const respostaBD = await database.query(querySelectLivro);

        // usando a resposta para instanciar um objeto do tipo livro
        respostaBD.rows.forEach((linha) => {
            // instancia (cria) objeto livro
            let novoLivro = new Livro(
                linha.titulo,
                linha.autor,
                linha.editora,
                linha.ano_publicacao,
                linha.isbn,
                linha.quant_total,
                linha.quant_disponivel,
                linha.valor_aquisicao,
                linha.status_livro_emprestado
            );

            // atribui o ID objeto
            novoLivro.setIdLivro(linha.id_livro);

            // adiciona o objeto na lista
            listaDeLivro.push(novoLivro);
            });

        // retorna a lista de livros
        return listaDeLivro;
    } catch (error) {
        console.log('Erro ao buscar lista de livros. Verifique os logs para mais detalhes.');
        console.log(error);
        return null;
    }
}



/**
     * Realiza o cadastro de um livro no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Livro` e insere seus dados (marca, modelo, ano e cor)
     * na tabela `livro` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Livro} Livro - Objeto contendo os dados do livro que será cadastrado. O objeto `Livro`
     *                        deve conter os métodos `getMarca()`, `getModelo()`, `getAno()` e `getCor()`
     *                        que retornam os respectivos valores do livro.
     * @returns {Promise<boolean>} - Retorna `true` se o livro foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
}