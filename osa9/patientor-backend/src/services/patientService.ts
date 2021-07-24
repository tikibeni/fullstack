import {v4 as uuid} from 'uuid';
import patientData from '../../data/patients';

import {Entry, NewEntry, NewPatient, NonSensitivePatient, Patient} from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitive = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const addPatient = ( entry: NewPatient ): Patient => {
    const id: string = uuid();
    const newPatientEntry = {
        id,
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = ( entry: NewEntry, patient: Patient ): Entry => {
    const id: string = uuid();
    const newEntry = {
        ...entry,
        id
    };

    patient.entries.push(newEntry as Entry);
    return newEntry as Entry;
};

export default {
    getPatients,
    getNonSensitive,
    getById,
    addPatient,
    addEntry
};
