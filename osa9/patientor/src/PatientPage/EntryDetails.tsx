import {Entry} from "../types";
import React from "react";
import {Card, Icon} from "semantic-ui-react";

const RenderHeart = ({info} : {info: number}) => {
    const color = info == 0 ? "green" : "orange";
    return (
        <Card.Meta>
            <Icon name={"heart"} color={color} />
        </Card.Meta>
    );
};

const OccupationalEntry = ({entry} : {entry: Entry}) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name={"stethoscope"} />
                    {"employerName" in entry ? entry.employerName : null}
                </Card.Header>
                <Card.Meta>{entry.description}</Card.Meta>
            </Card.Content>
        </Card>
    );
};

const HealthCheckEntry = ({entry} : {entry: Entry}) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name={"user md"} />
                </Card.Header>
                <Card.Meta>{entry.description}</Card.Meta>
                <br />
                <RenderHeart info={"healthCheckRating" in entry ? entry.healthCheckRating : 0} />
            </Card.Content>
        </Card>
    );
};

const HospitalEntry = ({ entry } : { entry: Entry }) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name={"hospital"} />
                </Card.Header>
                <Card.Meta>{entry.description}</Card.Meta>
            </Card.Content>
        </Card>
    );
};

const EntryDetails = ({ entry } : { entry: Entry }) => {
    console.log('Entry: ', entry);
    switch (entry.type) {
        case "OccupationalHealthcare":
            return <OccupationalEntry entry={entry} />;
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />;
        default:
            return <div />;
    }
};

export default EntryDetails;
