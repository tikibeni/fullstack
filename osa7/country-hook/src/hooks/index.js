import { useEffect, useState } from "react";
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    let url;
    if (name !== undefined) {
        url = `https://restcountries.eu/rest/v2/name/${name}`
    }

    useEffect(() => {
        axios
            .get(url)
            .then(res => {
                setCountry(res.data[0])
            })
            .catch(setCountry(null))
    }, [url])

    return country
}
