import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [showNone, setShowNone] = useState(true)

  // Hakee kaikkien maiden tiedot
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // Vastaa siitä, näytetäänkö joitain maiden nimiä vai ei yhtään
  const countriesToShow = showNone
      ? countries
      : countries.filter(country => (country.name.toLowerCase().includes(filterValue.toLowerCase())))

  // Filterin muutokset käsittelevä osa
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)

    if (event.target.value.length > 0) {
      if (showNone) {
        setShowNone(false)
      }

    } else {
      setShowNone(true)
    }
  }

  return (
    <div>
      <Filter value={filterValue} filterHandler={handleFilterChange} />
      <Countries countries={countriesToShow} filterHandler={handleFilterChange} />
    </div>
  )
}

// Filterin renderöinnistä vastaava komponentti
const Filter = ({value, filterHandler}) => {
  return (
    <div>
      Find countries:
      <input
        value={value}
        onChange={filterHandler}
      />
    </div>
  )
}

export default App