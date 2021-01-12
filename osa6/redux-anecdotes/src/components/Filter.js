import React from "react"
import { connect } from 'react-redux'
import { createFilter, resetFilter } from "../reducers/filterReducer"

const Filter = (props) => {
    const handleChange = (event) => {
        if (event.target.value.length === 0) {
            props.resetFilter()
        } else {
            props.createFilter(event.target.value)
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

const mapDispatchToProps = {
    createFilter,
    resetFilter
}

export default connect(
    null,
    mapDispatchToProps
)(Filter)