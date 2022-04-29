import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '7cffbd42-f90e-47ce-a60b-e74b78a84e14'
    }

})

export const TodolistsAPI = {
    getTodo() {
        return instance.get<TodoType[]>('todo-lists')
            .then((res) => res.data)
    },
    createTodo(title: string) {
        return instance.post<any, AxiosResponse<CommonResponseType<{ item: TodoType }>>, {title: string}>('todo-lists', {title})
            .then((res) => res.data)
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
            .then((res) => res.data)
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, title)
            .then((res) => res.data)
    },
}

type TodoType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}
