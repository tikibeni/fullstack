interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

const calculateExercises = (hoursArray: Array<number>, target: number): ExerciseResult => {
    const periodLength: number = hoursArray.length
    let trainingDays: number = 0
    let sum: number = 0
    hoursArray.forEach(function (hour){
        sum = sum + hour
        if (hour !== 0) trainingDays++
    })
    const average = sum / periodLength
    const success = average >= target
    let rating: number
    let ratingDescription: string

    switch (true) {
        case average > target:
            rating = 3
            ratingDescription = "You exceeded your expectations!"
            break
        case average == target:
            rating = 2
            ratingDescription = "You followed your plan exactly"
            break
        case average < target:
            rating = 1
            ratingDescription = "You didn't reach your target this time"
            break
        default: break
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    } as ExerciseResult
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
