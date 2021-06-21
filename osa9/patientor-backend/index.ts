import express from 'express';
import diagnoseRouter from './src/routes/diagnoses';
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
    console.log('ping');
    res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
