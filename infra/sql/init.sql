CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);


CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();


CREATE TABLE Livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);

CREATE TABLE Emprestimo (
    id_emprestimo SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);

INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');


/*mudar esse segundo bloco*/
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES  
('Lucas', 'Silva', '2005-04-10', 'Rua Nova, 321', 'lucas.silva@gmail.com', '16991234567'),
('Amanda', 'Souza', '2003-02-15', 'Avenida Central', 'amanda.souza@gmail.com', '16992345678'),
('Gabriel', 'Santos', '2002-11-20', 'Rua B, 789', 'gabriel.santos@exemplo.com', '16993456789'),
('Maria', 'Oliveira', '2001-05-05', 'Rua das Flores, 555', 'maria.oliveira@exemplo.com', '16994567890'),
('Ricardo', 'Melo', '1999-08-30', 'Rua do Sol, 100', 'ricardo.melo@gmail.com', '16995678901'),
('Julia', 'Costa', '2000-12-12', 'Rua das Estrelas, 101', 'julia.costa@exemplo.com', '16996789012'),
('Pedro', 'Pereira', '2003-03-22', 'Rua Verde, 202', 'pedro.pereira@gmail.com', '16997890123'),
('Sofia', 'Lima', '2004-06-16', 'Rua Mar, 303', 'sofia.lima@gmail.com', '16998901234'),
('Thiago', 'Alves', '2008-07-07', 'Rua da Praia, 404', 'thiago.alves@gmail.com', '16999012345'),
('Clara', 'Gomes', '2006-09-09', 'Rua do Rio, 505', 'clara.gomes@gmail.com', '16990123456');

INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('A Menina que Roubava Livros', 'Markus Zusak', 'Companhia das Letras', '2005', '978-8580571475', 10, 10, 70.00, 'Disponível'),
('O Alquimista', 'Paulo Coelho', 'HarperCollins', '1988', '978-8573021476', 8, 8, 45.00, 'Disponível'),
('Cem Anos de Solidão', 'Gabriel García Márquez', 'HarperCollins', '1967', '978-8535922015', 6, 6, 95.00, 'Disponível'),
('A Guerra dos Tronos', 'George R.R. Martin', 'Leya', '1996', '978-8544001560', 12, 12, 120.00, 'Disponível'),
('O Morro dos Ventos Uivantes', 'Emily Brontë', 'Penguin Classics', '1847', '978-0141439556', 7, 7, 85.00, 'Disponível'),
('O Caçador de Pipas', 'Khaled Hosseini', 'Editora Nova Fronteira', '2003', '978-8535920608', 9, 9, 60.00, 'Disponível'),
('A Casa dos Espíritos', 'Isabel Allende', 'Record', '1982', '978-8501067815', 5, 5, 100.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 4, 4, 50.00, 'Disponível'),
('As Aventuras de Sherlock Holmes', 'Arthur Conan Doyle', 'Penguin Classics', '1892', '978-0140439080', 3, 3, 75.00, 'Disponível');


INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Guarani', 'José de Alencar', 'Martins Fontes', '1857', '978-8573262538', 10, 9, 55.00, 'Disponível'),
('A Moreninha', 'Joaquim Manuel de Macedo', 'Leya', '1844', '978-8575032002', 8, 8, 40.00, 'Disponível'),
('Memórias Póstumas de Brás Cubas', 'Machado de Assis', 'Companhia das Letras', '1881', '978-8535933620', 6, 6, 70.00, 'Disponível'),
('Grande Sertão: Veredas', 'João Guimarães Rosa', 'Companhia das Letras', '1956', '978-8535921063', 12, 12, 90.00, 'Disponível'),
('Vidas Secas', 'Graciliano Ramos', 'Record', '1938', '978-8501086523', 7, 7, 80.00, 'Disponível'),
('A Cidade e as Serras', 'Eça de Queirós', 'Penguin Classics', '1901', '978-0140449103', 9, 9, 75.00, 'Disponível'),
('Os Sertões', 'Euclides da Cunha', 'Companhia das Letras', '1902', '978-8535931542', 5, 5, 100.00, 'Disponível'),
('O Alquimista', 'Paulo Coelho', 'HarperCollins', '1988', '978-8573021476', 7, 7, 60.00, 'Disponível'),
('O Primo Basílio', 'José Maria de Eça de Queirós', 'Leya', '1878', '978-8501061114', 4, 4, 95.00, 'Disponível'),
('O Mágico de Oz', 'L. Frank Baum', 'Penguin Classics', '1900', '978-0142405800', 3, 3, 50.00, 'Disponível');

INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');


INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-10-03', '2024-10-17', 'Em andamento'),  -- Lucas Silva
(2, 1, '2024-10-02', '2024-10-16', 'Em andamento'),  -- Amanda Souza
(3, 5, '2024-10-01', '2024-10-17', 'Em andamento'),  -- Gabriel Santos
(4, 6, '2024-10-04', '2024-10-18', 'Em andamento'),  -- Maria Oliveira
(5, 3, '2024-10-05', '2024-10-19', 'Em andamento'),  -- Ricardo Melo
(6, 4, '2024-10-06', '2024-10-20', 'Em andamento'),  -- Julia Costa
(7, 8, '2024-10-07', '2024-10-21', 'Em andamento'),  -- Pedro Pereira
(8, 7, '2024-10-08', '2024-10-22', 'Em andamento'),  -- Sofia Lima
(9, 9, '2024-10-09', '2024-10-23', 'Em andamento'),  -- Thiago Alves
(10, 10, '2024-10-10', '2024-10-24', 'Em andamento'), -- Clara Gomes
(1, 10, '2024-10-11', '2024-10-25', 'Em andamento'), 
(2, 3, '2024-10-12', '2024-10-26', 'Em andamento'), 
(4, 5, '2024-10-13', '2024-10-27', 'Em andamento'), 
(6, 2, '2024-10-14', '2024-10-28', 'Em andamento'); 

SELECT * FROM Aluno;

SELECT 
    a.ra, 
    a.nome, 
    a.sobrenome, 
    a.celular, 
    l.titulo, 
    l.autor, 
    l.editora, 
    e.data_emprestimo, 
    e.data_devolucao, 
    e.status_emprestimo
FROM 
    Emprestimo e
JOIN 
    Aluno a ON e.id_aluno = a.id_aluno
JOIN 
    Livro l ON e.id_livro = l.id_livro;