import React from "react"
import { useDispatch } from 'react-redux'
import { createFilter, resetFilter } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        if (event.target.value.length === 0) {
            dispatch(resetFilter())
        } else {
            dispatch(createFilter(event.target.value))
        }
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter
            <input
                onChange={handleChange}
            />
        </div>
    )
}

export default Filter