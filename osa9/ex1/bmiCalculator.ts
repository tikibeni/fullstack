type Result = string

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

console.log(calculateBmi(180, 74))
