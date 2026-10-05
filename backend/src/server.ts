import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

interface Guerreiro {
  id: number;
  nome: string;
  raca: string;
  poderDeLuta: number;
}

const guerreiros: Guerreiro[] = [
  { id: 1, nome: 'Goku', raca: 'Saiyajin', poderDeLuta: 8000 },
  { id: 2, nome: 'Vegeta', raca: 'Saiyajin', poderDeLuta: 7500 },
];

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'API Dragon Ball IEC ativa!' });
});

app.get('/api/personagens', (_req: Request, res: Response) => {
  res.status(200).json(guerreiros);
});

app.post('/api/personagens', (req: Request, res: Response) => {
  const { nome, raca, poderDeLuta } = req.body;
  if (!nome || !raca) {
    return res
      .status(400)
      .json({ erro: 'Nome e raça são campos obrigatórios.' });
  }

  const novo: Guerreiro = {
    id: guerreiros.length + 1,
    nome,
    raca,
    poderDeLuta: Number(poderDeLuta) || 0,
  };
  guerreiros.push(novo);
  return res.status(201).json(novo);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
