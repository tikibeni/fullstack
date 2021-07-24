import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
     type: "SET_DIAGNOSE_LIST";
     payload: Diagnosis[];
    }
  | {
     type: "ADD_ENTRY";
     payload: Entry;
     patient: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      if (state.patient) {
        return {
          ...state,
          patient: {
            ...state.patients[action.patient.id],
            entries: [
              ...state.patient.entries,
              action.payload
            ]
          }
        };
      }
      return state;
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]) => {
  const action: Action = {
    type: "SET_PATIENT_LIST",
    payload
  };

  return action;
};

export const setPatient = (payload: Patient) => {
  const action: Action = {
    type: "SET_PATIENT",
    payload
  };

  return action;
};

export const addPatient = (payload: Patient) => {
  const action: Action = {
    type: "ADD_PATIENT",
    payload
  };

  return action;
};

export const addEntry = (payload: Entry, patient: Patient) => {
  const action: Action = {
    type: "ADD_ENTRY",
    payload,
    patient
  };

  return action;
};

export const setDiagnoseList = (payload: Diagnosis[]) => {
  const action: Action = {
    type: "SET_DIAGNOSE_LIST",
    payload
  };

  return action;
};
