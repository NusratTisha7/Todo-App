import React from 'react'
import { useForm } from 'react-hook-form';
import Navbar from '../Navbar/navbar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Paper, Avatar } from '@material-ui/core'
import { Redirect, Link } from 'react-router-dom';
import { signIn } from '../../Api/userAuth'
import { authenticate, isAuthenticated } from '../../utils/auth';
import {Message} from "../../utils/alert"
import './auth.css'


export default function Login({history}) {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = data => {
        signIn(data).then(res => {
            authenticate(res.data.token, () => {
                history.push('/')
            })
        }).catch(err => {
            Message(false,err.response.data)
        })
    };

    const signInForm = () => (
        <div>
            <Navbar />
            <Paper className='paperStyle'>
                <div align='center' className='mt-3'>
                    <Avatar className="avatarStyle"><LockOutlinedIcon /></Avatar>
                    <h1 class="text-xl md:text-2xl font-bold leading-tight mt-2">Log In</h1>
                </div>
                <div  >
                    <form id='form' onSubmit={handleSubmit(onSubmit)}>
                        <div align='center' className='firstInput'>
                            <input type="text" {...register("email", { required: true })} placeholder='Email' fullWidth />
                        </div>
                        <p className='errorStyle'>{errors.email?.type === "required" && "Please enter your email"} </p>
                        <div align='center'>
                            <input type="password" {...register("password", { required: true })} placeholder='password' />
                        </div>
                        <p className='errorStyle'>{errors.password?.type === "required" && "Please enter your Password"} </p>
                        <div align='center'>
                            <button type='submit' variant='contained' className="btnStyle" >Login</button>
                        </div>
                        <div className='note'>
                            <Link to="/register" style={{ color: '#527a7a' }}>Create a new account</Link>
                        </div>
                    </form>
                </div >
            </Paper>
        </div>
    )

    return (
        <div>
            {isAuthenticated() ? <Redirect to="/todo" /> : ""}
            {signInForm()}
        </div>

    )
}