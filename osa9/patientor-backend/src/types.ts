export type SickLeave = {
    startDate: string,
    endDate: string
};

export type Discharge = {
    date: string,
    criteria: string,
};

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    type: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>
}

interface OccupationalHealthcareEntry extends BaseEntry {
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

interface HospitalEntry extends BaseEntry {
    discharge: {
        date: string;
        criteria: string;
    }
}

interface HealthCheckEntry extends BaseEntry {
    healthCheckRating: number;
}

export type Entry =
    | OccupationalHealthcareEntry
    | HospitalEntry
    | HealthCheckEntry;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export type NewEntry = Omit<Entry, 'id'>;
