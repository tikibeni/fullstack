import React, {useEffect, useState} from 'react'
import axios from 'axios'

// Renderöitävien maiden renderöinnistä vastaava komponentti
const Countries = ({countries, filterHandler}) => {
    if (countries.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    } 
  
    if (countries.length === 1) {
      const country = countries[0]
  
      return (
        <div>
          <Country key={country.alpha3code} country={country} />
        </div>
      )
    }
  
    return (
      <div>
        {countries.map(country =>
          <CountryNames key={country.alpha3Code} country={country} filterHandler={filterHandler}/>
        )}
      </div>
    )
}
  
// Maiden nimien renderöinnistä vastaava komponentti (kun 2 <= x <= 10 kohdetta)
const CountryNames = ({country, filterHandler}) => {
    return (
        <div>
          {country.name}
          <button
            onClick={filterHandler}
            value={country.name}
          >show</button>
        </div>
    )
}

// Tarkasteltavan valtion infojen renderöinnistä vastaava komponentti
const Country = ({country}) => {
    const languages = country.languages

    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>

            <h2>Languages</h2>
            <ul>
                {languages.map(language => 
                    <Language key={language.iso639_1} language={language.name} />
                )}
            </ul>

            <Flag key={country.flag} flag={country.flag} />
            <Weather key={country.capital} capital={country.capital}/>
        </div>
    )
}
  
// Yksittäisen maan kielien renderöinnistä vastaava komponentti
const Language = ({language}) => {
    return (
      <li>
        {language}
      </li>
    )
}
  
// Yksittäisen maan lipun renderöinnistä vastaava komponentti
const Flag = ({flag}) => {
    return (
      <div>
        <img
          src={flag}
          alt="Flag of the country"
          width="250"
          heigth="250"
        />
      </div>
    )
}

// Yksittäisen maan säätietojen renderöinnistä vastaava komponentti
const Weather = ({capital}) => {
    const [weather, setWeather] = useState('')
    const api_key = process.env.REACT_APP_API_KEY
    const params = {
        access_key: api_key,
        query: capital,
    }
  
    useEffect(() => {
        axios
          .get('http://api.weatherstack.com/current', {params})
          .then(response => {
             setWeather(response.data.current)
          }).catch(error => {
            console.log(error)
          })
    },[])
    
    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature: {weather.temperature} degrees celcius</p>
            <p>Currently {weather.weather_descriptions}</p>
            <img
              src={weather.weather_icons}
              alt="Descriptive weather icon"
              width="50"
              height="50"
            />
            <p>Wind: {weather.wind_speed} kph, direction {weather.wind_dir}</p>
        </div>
    )
}

export default Countries