import React from "react";
import { CoursePart } from '../types';

const Total = ({ data }: { data: CoursePart[] }) => (
    <p>
        Number of exercises{" "}
        {data.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
)

export default Total
