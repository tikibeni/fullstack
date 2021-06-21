import { v4 as uuid } from 'uuid';
import patientData from '../../data/patients.json';

import { NewPatientEntry, PatientEntry, NonSensitivePatientEntry } from '../types';

const patients: Array<PatientEntry> = patientData;

const getPatients = (): PatientEntry[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id: string = uuid() as string;
    const newPatientEntry = {
        id,
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    getNonSensitiveEntries,
    addPatient,
};
