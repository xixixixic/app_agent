export function calculateBMI (weight, height) {
    console.log(weight)
    console.log(height)
    if (!/!^\b[1-9]\d{0,1}\b|\b[1-6]\d\d\b|\b700\b$/.test(weight)) {
        return '体重错误[1kg-700kg]'
    }
   /*  height = height / 100
    let BMI = weight / (height * height)
    return BMI */
}