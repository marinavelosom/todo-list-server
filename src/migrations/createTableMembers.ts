import db from '../config/db';

const createMembersTable = async () => {
  try {
    await db.getConnection();
    console.log('Conexão com o banco de dados bem-sucedida.');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const [result] = await db.execute(createTableQuery);
    console.log('Tabela "members" criada com sucesso.');
  } catch (error) {
    console.error('Erro ao criar a tabela "members":', error);
  }
};

export default createMembersTable;
