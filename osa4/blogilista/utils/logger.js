const info  = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }
}

// Tämän voi muuttaa, jos siltä tuntuu.
const error = (...params) => {
    //if (process.env.NODE_ENV !== 'test') {
        console.error(...params)
    //}
}

module.exports = {
    info, error
}