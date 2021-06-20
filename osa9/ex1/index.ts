/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, ExerciseResult } from './exerciseCalculator';

const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
    const data = req.body;
    if (!data.daily_exercises || !data.target) { res.status(400); res.json({ error: "parameters missing" }); }
    else {
        const result: ExerciseResult = calculateExercises(data.daily_exercises, data.target);
        if (result.rating == 0) {
            res.status(400);
            res.json({ error: "malformed parameters" });
        } else {
            res.json({ result });
        }
    }
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
