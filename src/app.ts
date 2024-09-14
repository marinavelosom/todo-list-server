import express from 'express';
import memberRoutes from './routes/memberRoutes';

const app = express();

app.use(express.json());
app.use('/api', memberRoutes);

export default app;
