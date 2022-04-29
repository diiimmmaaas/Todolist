import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": "7cffbd42-f90e-47ce-a60b-e74b78a84e14"
    }
})

export const todolistAPI = {
    getTodo: () => {
        return instance.get<Array<TodoType>>('todo-lists')
    },
    createTodo: (title: string) => {
        return instance.post<any, AxiosResponse<CommonResponseType<{ item: TodoType }>>, {title: string}>('todo-lists', {title})
    },
    deleteTodo: (todolistId: string) => {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle: (todolistId: string, title: string) => {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`, {title})

    }
}


// Types
type TodoType = {
    id: string
    title: string
    addedData: string
    order: number
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

