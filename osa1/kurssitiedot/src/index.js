import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <p>
        This course is called: {props.course}
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        The name of the part is: {props.part.name}, it has {props.part.exercises} exercises.
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
        <Part part={props.content[0]} />
        <Part part={props.content[1]} />
        <Part part={props.content[2]} />
    </div>
  )
}


const Total = (props) => {
  return (
    <div>
      <p>
        The total amount of exercises is: {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <h1>Part 1: React - Course information</h1>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total total={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))