import React from 'react'

// Sisällön renderöinnin vastuunjakelija
const Course = ({header, content}) => {
    return (
      <div>
        <Header header={header} />
        <Content content={content} />
      </div>
    )
}
  
// Kurssin nimen renderöinnistä vastaava komponentti
const Header = ({header}) => {
    return (
        <div>
            <h2>
            {header}
            </h2>
        </div>
    )
}
  
// Kurssin sisällön renderöinnistä vastaava komponentti
const Content = ({content}) => {
    const exerciseArray = []
    
    content.forEach(part => {
      exerciseArray.push(part.exercises)
    });
  
    return (
      <div>
          {content.map(content =>
            <Part key={content.id} name={content.name} exercises={content.exercises} />
          )}
          <Total exercises={exerciseArray} />
      </div>
    )
}
  
// Yksittäisen osan sisällön renderöinnistä vastaava komponentti
const Part = ({name, exercises}) => {
    return (
      <div>
        <p>
          Part: "{name}" has {exercises} exercises.
        </p>
      </div>
    )
}
  
// Kurssin tehtävien kokonaismäärän renderöinnistä vastaava komponentti
const Total = ({exercises}) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const sum = exercises.reduce(reducer)
  
    return (
      <div>
        <b>a total of {sum} exercises</b>
      </div>
    )  
}

export default Course