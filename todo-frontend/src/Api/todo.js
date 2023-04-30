import axios from 'axios';
import { API } from '../utils/config';


export const createTodo = (token, todo) => {
    return axios.post(`${API}/todo/create`, todo, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}


export const getTodos = (token) => {
    return axios.get(`${API}/todo/getAll`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}

export const editTodo = (token, todo) => {
    let data = {
        title: todo.title,
        description: todo.description
    }
    return axios.put(`${API}/todo/edit/${todo.id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}


export const deleteTodo = (token, todo) => {
    return axios.delete(`${API}/todo/delete/${todo}`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}