interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

interface ExerciseParser {
    hoursArray: Array<number>,
    target: number
}

const parseEXArguments = (args: Array<string>): ExerciseParser => {
    if (args.length < 4) throw new Error('Not enough args');
    let target: number;
    if (!isNaN(Number(args[2]))) { target = Number(args[2]); }
    else throw new Error('Only insert numbers');
    const maxIndex = args.length - 1;
    let index = 3;
    const hoursArray: Array<number> = [];
    while (index <= maxIndex) {
        if (!isNaN(Number(args[index]))) {
            hoursArray.push(Number(args[index]));
        } else {
            throw new Error('Only insert numbers');
        }
        index++;
    }
    return {
        hoursArray,
        target
    };
};

const calculateExercises = (hoursArray: Array<number>, target: number): ExerciseResult => {
    const periodLength: number = hoursArray.length;
    let trainingDays = 0;
    let sum = 0;
    hoursArray.forEach(function (hour){
        sum = sum + hour;
        if (hour !== 0) trainingDays++;
    });
    const average = sum / periodLength;
    const success = average >= target;
    let rating = 0;
    let ratingDescription = "";

    switch (true) {
        case average > target:
            rating = 3;
            ratingDescription = "You exceeded your expectations!";
            break;
        case average == target:
            rating = 2;
            ratingDescription = "You followed your plan exactly";
            break;
        case average < target:
            rating = 1;
            ratingDescription = "You didn't reach your target this time";
            break;
        default: break;
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    } as ExerciseResult;
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

try {
    const { hoursArray, target } = parseEXArguments(process.argv);
    console.log(calculateExercises(hoursArray, target));
} catch (e) {
    if (e instanceof Error) console.log('Error: ', e.message);
}
