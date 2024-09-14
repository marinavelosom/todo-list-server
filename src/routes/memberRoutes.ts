import express, { Request, Response} from 'express';
import Member from '../models/Member';
import { body, validationResult } from 'express-validator'; // Validação

const router = express.Router();

router.post(
  '/members',
  [
    body('name').notEmpty().withMessage('Nome é obrigatório.'),
    body('email').isEmail().withMessage('E-mail inválido.')
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email } = req.body;

      const newMember = await Member.create({ name, email });

      res.status(201).json({
        message: 'Membro criado e e-mail enviado.',
        data: newMember
      });
    } catch (error) {
      console.error('Erro ao criar membro:', error);
      
      if(error instanceof Error) {
        if (error.name === 'SequelizeValidationError') {
          return res.status(400).json({
            message: 'Erro de validação dos dados.',
            error: (error as any).errors
          });
        }
  
        res.status(500).json({
          message: 'Erro ao criar o membro e enviar o e-mail.',
          error: error.message
        });
      } else {
        return res.status(500).json({
          message: 'Erro desconhecido ao criar o membro.',
          error: error
        });
      }
    }
  }
);

export default router;
