import {Gender, NewPatient, Entry, NewEntry, Discharge, SickLeave} from './types';
import {HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry} from "../../patientor/src/types";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };
type EntryFields = {
    date: unknown,
    type: unknown,
    specialist: unknown,
    diagnosisCodes: unknown | undefined,
    description: unknown,
    discharge: unknown | undefined,
    employerName: unknown | undefined,
    sickLeave: unknown | undefined,
    healthCheckRating: unknown | undefined
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isEntryArray = (param: unknown): param is Entry[] => {
    return param instanceof Array;
};

const isDiagnosisCodeArray = (param: unknown): param is string[] => {
    return param instanceof Array;
};

const parseString = (attr: unknown): string => {
    if (!attr || !isString(attr)) {
        throw new Error('Incorrect or missing attribute');
    }

    return attr;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }

    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }

    return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !isEntryArray(entries)) {
        return [];
    }

    return entries;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] | undefined => {
    if (!diagnosisCodes || !isDiagnosisCodeArray(diagnosisCodes)) {
        return undefined;
    }

    return diagnosisCodes;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
    if (!sickLeave || !(sickLeave as SickLeave).startDate || !(sickLeave as SickLeave).endDate) return undefined;
    return sickLeave as SickLeave;
};

const parseDischarge = (discharge: unknown): Discharge | undefined => {
    if (!discharge || !(discharge as Discharge).date || !(discharge as Discharge).criteria)  return undefined;
    return discharge as Discharge;
};

const parseHealthCheckRating = (healthCheckRating: unknown): number | undefined => {
    if (!healthCheckRating) return undefined;
    return healthCheckRating as number;
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries } : Fields): NewPatient => {
    return {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        entries: parseEntries(entries)
    };
};

export const toNewEntry = ({ date, type, description, specialist, diagnosisCodes, employerName, sickLeave, discharge, healthCheckRating }: EntryFields): NewEntry | undefined => {
    const entryToReturn = {
        date: parseDate(date),
        type: parseString(type),
        description: parseString(description),
        specialist: parseString(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
    };

    switch (entryToReturn.type) {
        case ("OccupationalHealthcare"):
            return {
                ...entryToReturn,
                employerName: parseString(employerName),
                sickLeave: parseSickLeave(sickLeave)
            } as OccupationalHealthcareEntry;
        case ("Hospital"):
            return {
                ...entryToReturn,
                discharge: parseDischarge(discharge)
            } as HospitalEntry;
        case ("HealthCheck"):
            return {
                ...entryToReturn,
                healthCheckRating: parseHealthCheckRating(healthCheckRating)
            } as HealthCheckEntry;
        default:
            return undefined;
    }
};
