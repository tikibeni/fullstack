import React, {useEffect, useState} from "react";
import {Button, Card, Container, Icon} from "semantic-ui-react";
import {addEntry, setPatient, useStateValue} from "../state";
import {Entry, Gender, Patient} from "../types";
import {useParams} from "react-router-dom";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import {EntryFormValues} from "../AddEntryModal/AddEntryForm";


const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients, patient }, dispatch] = useStateValue();
    const [localPatient, setLocalPatient] = useState<Patient | undefined>(Object.values(patients).find((p: { id: string; }) => p.id === id));
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            if (localPatient !== undefined && newEntry !== undefined) {
                dispatch(addEntry(newEntry, localPatient));
                const test = {
                    ...localPatient,
                    entries: [
                        ...localPatient.entries,
                        newEntry
                    ]
                };
                setLocalPatient(test);
            }
            closeModal();
        } catch (e) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown Error');
        }
    };

    useEffect(() => {
        const fetchSSN = async () => {
            if (localPatient?.ssn === undefined && localPatient !== undefined) {
                try {
                    const {data: patientData} = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    const newPatient = {
                        ...localPatient,
                        ssn: patientData.ssn
                    };
                    setLocalPatient(newPatient);
                    dispatch(setPatient(newPatient));
                } catch (e) {
                    console.error(e);
                }
            }
        };
        void fetchSSN();
    }, [patient]);


    const renderGender = (
        localPatient?.gender == (Gender.Male)
            ? <Icon name="man" />
            : localPatient?.gender == (Gender.Female)
                ? <Icon name="woman" />
                : <Icon name="genderless" />
    );

    if (localPatient === undefined) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div className="Profile">
            <Container textAlign="justified">
                <h3>{localPatient?.name} {renderGender}</h3>
                <div>
                    ssn: {localPatient?.ssn} <br />
                    occupation: {localPatient?.occupation}
                </div>
                <h4>entries</h4>
                <div>
                    {localPatient?.entries?.length === 0
                        ? <div>No entries.</div>
                        : <Card.Group itemsPerRow={1}>
                            {
                                localPatient?.entries?.map(entry =>
                                    <EntryDetails key={entry.id} entry={entry} />
                                )
                            }
                          </Card.Group>
                    }
                </div>
                <div>
                    <AddEntryModal
                        modalOpen={modalOpen}
                        onSubmit={submitNewEntry}
                        error={error}
                        onClose={closeModal}
                    />
                </div>
                <Button onClick={() => openModal()}>Add new entry</Button>
            </Container>
        </div>
    );
};

export default PatientPage;
