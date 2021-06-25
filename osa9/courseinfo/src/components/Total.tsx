import React from "react";

interface CourseData {
    name: string,
    exerciseCount: number
}

const Total = ({ data }: { data: Array<CourseData> }) => (
    <p>
        Number of exercises{" "}
        {data.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
)

export default Total
