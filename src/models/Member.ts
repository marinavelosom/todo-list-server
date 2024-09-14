import db from '../config/db';
import bcrypt from 'bcrypt';

interface MemberData {
  name: string;
  email: string;
}

class Member {
  static async create(data: MemberData) {
    const temporaryPassword = 'senha-temporaria';
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10); 

    const query = 'INSERT INTO members (name, email, senha) VALUES (?, ?, ?)';
    try {
      const [result] = await db.execute(query, [data.name, data.email, hashedPassword]);
      return result;
    } catch (error) {
      console.error('Erro ao inserir membro no banco de dados:', error);
      throw new Error('Erro ao inserir membro no banco de dados');
    }
  }
}

export default Member;

