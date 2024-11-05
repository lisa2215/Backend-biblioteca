import { server } from './server';
import { DataBaseModel } from './models/DataBaseModel';

const port: number = 3333;

new DataBaseModel().testeConexao().then((resdb) => {
  if (resdb) {
    server.listen(port, () => {
      console.clear();
      console.log(`Endereço do servidor: http://localhost:${port}`);
    });
  } else {
    console.log(`Erro ao conectar com o banco de dados.`);
  }
});