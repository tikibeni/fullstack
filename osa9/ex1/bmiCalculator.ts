type Result = string

interface RatioValues {
    height: number,
    weight: number
}

const parseBMIArguments = (args: Array<string>): RatioValues => {
    if (args.length < 4) throw new Error('Not enough args')
    if (args.length > 4) throw new Error('Too many args')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    }
    throw new Error('Provided values were not numbers')
}

const calculateBmi = (height: number, weight: number): Result => {
    const result: number = weight / ((height / 100) * (height / 100))

    switch (true) {
        case result <= 15:
            return 'Very severely underweight'
        case (result > 15 && result <= 16):
            return 'Severely underweight'
        case (result > 16 && result <= 18.5):
            return 'Underweight'
        case (result > 18.5 && result <= 25):
            return 'Normal'
        case (result > 25 && result <= 30):
            return 'Overweight'
        case (result > 30 && result <= 35):
            return 'Obese Class I'
        case (result > 35 && result <= 40):
            return 'Obese Class II'
        case (result > 40):
            return 'Obese Class III'

        default:
            throw new Error('Something went wrong')
    }
}

try {
    const { height, weight } = parseBMIArguments(process.argv)
    console.log(calculateBmi(height, weight))
} catch (e) {
    console.log('Error: ', e.message)
}
