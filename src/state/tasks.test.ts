import {div, mult, numberReducer, sub, sum, ActionType} from "./tasks";

test("sum of two numbers",() => {
    //1. Тестовые данные:
    const a: number = 10
    const b: number = 20
    //2. Выполнение тестируемого кода
    const result = sum(a, b)
    //3. Проверка результата
    expect(result).toBe(30)
})

test("sub of two numbers",() => {
    //1. Тестовые данные:
    const a: number = 100
    const b: number = 20
    //2. Выполнение тестируемого кода
    const result = sub(a, b)
    //3. Проверка результата
    expect(result).toBe(80)
})

test("mult of two numbers",() => {
    //1. Тестовые данные:
    const a: number = 10
    const b: number = 20
    //3. Проверка результата
    expect(mult(a, b)).toBe(200)
})

test("div of two numbers",() => {
    expect(div(100, 20)).toBe(5)
})

test("sum with numberReducer", () => {
    const salary: number = 1000
    const action: ActionType = {
        type: "SUM",
        num: 300

    }
    const result = numberReducer(salary, action)
    expect(result).toBe(1300)
} )

test("sub with numberReducer", () => {
    const salary: number = 1000
    const action: ActionType = {
        type: "SUB",
        num: 300

    }
    const result = numberReducer(salary, action)
    expect(result).toBe(700)
} )