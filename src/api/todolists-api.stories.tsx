import React, {useEffect, useState} from 'react'
import {TodolistsAPI} from "./api";

export default {
    title: 'Todolists/API'
}

const setting = {
    withCredentials: true,
    headers: {
        'API-KEY': '7cffbd42-f90e-47ce-a60b-e74b78a84e14'
    }

}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistsAPI.getTodo()
            .then((data) => {
                setState(data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = 'Redux'
        TodolistsAPI.createTodo(title)
            .then((data) => {
                setState(data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '35743add-b974-4f5a-b268-02ae283a51bf'
        TodolistsAPI.deleteTodo(todolistId)
            .then((data) => {
                setState(data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '35743add-b974-4f5a-b268-02ae283a51bf'
        const title = 'Storybook'
        TodolistsAPI.updateTodo(todolistId, title)
            .then((data) => {
                setState(data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}