// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).


export function sum(...nums: Array<number>): number {

    /*let result = 0
    for (let i=0; i< nums.length; i++) {
        result +=  nums[i]
    }
    return result*/

    let sum = nums.reduce((accum, item) => {
        accum += item
        return accum
    }, 0)
    return sum
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    if (a + c > b && c + b > a && b + a > c) {
        if (a === b && b === c) {
            return "10"
        } else if (a === b || a === c || b === c) {
            return "01"
        } else {
            return "11"
        }
    }
    return "00"
}

// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
    /*let result = 0
    let array = ("" + number).split("").map(Number)
    for (let i = 0; i < array.length; i++) {
        result += +array[i]
    }
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return result*/

    return number.toString().split('').reduce((acc, item) => Number(item) + acc, 0)
}


// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    //...здесь пишем код.
    let evenNum = 0
    let oddNum = 0
    for (let i = 0; i < arr.length; i += 2) {
        evenNum += arr[i]
    }
    for (let i = 1; i < arr.length; i += 2) {
        oddNum += arr[i]
    }
    // В return стоит "заглушка", чтоб typescript не ругался
    return evenNum > oddNum
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    let result = array.filter(item => item > 0 && Number.isInteger(item))
    let newArray = []
    for (let i = 0; i < result.length; i++) {
        newArray.push(result[i] *= result[i])
    }

    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return newArray
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    if (N == 0) return 0;

    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return N + sumFirstNumbers(N - 1);
}

// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
    //...здесь пишем код.
    let banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
    let newArray = []
    for (let i = 0; (amountOfMoney - banknotes[0]) > 0; i++) {
            newArray.push(banknotes[0])
    }
    console.log(newArray)

    // В return стоит "заглушка", чтоб typescript не ругался
    return [1]
}