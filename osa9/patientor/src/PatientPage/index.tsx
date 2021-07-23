import React, {useEffect, useState} from "react";
import {Container, Icon} from "semantic-ui-react";
import {useStateValue} from "../state";
import {Gender, Patient} from "../types";
import {useParams} from "react-router-dom";
import axios from "axios";
import {apiBaseUrl} from "../constants";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }] = useStateValue();
    const [patient, setPatient] = useState<Patient | undefined>(Object.values(patients).find((p: { id: string; }) => p.id === id));

    useEffect(() => {
        const fetchSSN = async () => {
            if (patient?.ssn === undefined && patient !== undefined) {
                try {
                    const {data: patientData} = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    const newPatient = {
                        ...patient,
                        ssn: patientData.ssn
                    };
                    setPatient(newPatient);
                } catch (e) {
                    console.error(e);
                }
            }
        };
        void fetchSSN();
    }, []);


    const renderGender = (
        patient?.gender == (Gender.Male)
            ? <Icon name="man" />
            : patient?.gender == (Gender.Female)
                ? <Icon name="woman" />
                : <Icon name="genderless" />
    );

    if (patient?.ssn === undefined) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div className="Profile">
            <Container textAlign="justified">
                <h3>{patient?.name} {renderGender}</h3>
                <div>
                    ssn: {patient?.ssn} <br />
                    occupation: {patient?.occupation}
                </div>
            </Container>
        </div>
    );
};

export default PatientPage;
