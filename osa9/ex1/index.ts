import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

    if ((height && weight) && (!isNaN(Number(height)) && !isNaN(Number(weight)))) {
        const result: string = calculateBmi(Number(height), Number(weight));
        res.send({
            weight,
            height,
            bmi: result,
        });
    } else {
        res.status(400);
        res.send({
            error: "malformed parameters"
        });
    }
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
