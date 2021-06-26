import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content = (props: { parts: CoursePart[] }) => {
    const { parts } = props
    const listOfParts = parts.map((part, i) =>
        <Part key={`part-${i}`} part={part} />
    )
    return (<>{listOfParts}</>)
};

export default Content;
