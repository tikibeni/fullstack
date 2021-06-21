import express from 'express';
import cors from 'cors';
import diagnoseRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patients';
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('ping');
    res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);

app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
