import { Request, Response } from 'express';
import Member from '../models/Member';

export const createMember = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await Member.create({ name, email });
    res.status(201).json({ message: 'Membro criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar membro' });
  }
};
