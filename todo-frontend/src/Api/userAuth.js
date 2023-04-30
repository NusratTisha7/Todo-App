import axios from 'axios';
import { API } from '../utils/config';

export const signIn = (user) => {
    return axios.post(`${API}/user/signIn`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const registration = (user) => {
    let data = {
        name: user.name,
        email:user.email,
        password:user.password

    }
    return axios.post(`${API}/user/signUp`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}