import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitive());
});

router.get('/:id', (req, res) => {
    const patient = patientService.getById(req.params.id);
    if (patient !== undefined) {
        res.send(patient);
    } else {
        res.status(404).end();
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;
