import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
      <div>
        <Header title={courseName} />
        {
        courseParts.map(part => (
          <Content key={part.name} name={part.name} exercises={part.exerciseCount} />
        ))
        }
        <Total data={courseParts}/>
      </div>
  );
};

export default App;
