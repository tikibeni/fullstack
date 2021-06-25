import React from 'react';

const Content = ({ name, exercises }: { name: string, exercises: number }) => (
    <p>{name} {exercises}</p>
);

export default Content;
