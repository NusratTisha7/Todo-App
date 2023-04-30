import React from 'react'
import { useForm } from 'react-hook-form';
import Navbar from '../Navbar/navbar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Paper, Avatar } from '@material-ui/core'
import { Redirect, Link } from 'react-router-dom';
import { registration } from '../../Api/userAuth'
import { authenticate, isAuthenticated } from '../../utils/auth';
import {Message} from "../../utils/alert"
import './auth.css'


export default function Register({ history }) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const onSubmit = data => {
        registration(data).then(res => {
            authenticate(res.data.token, () => {
                history.push('/')
            })
        }).catch(err => {
            Message(false,err.response.data)
        })
    };

    const registrationForm = () => (
        <div>
            <Navbar />
            <Paper className='paperStyleRegister'>
                <div align='center' className='mt-3'>
                    <Avatar className="avatarStyle"><LockOutlinedIcon /></Avatar>
                    <h1 class="text-xl md:text-2xl font-bold leading-tight mt-2">Registration</h1>
                </div>
                <div  >
                    <form id='form' onSubmit={handleSubmit(onSubmit)}>
                        <div align='center' className='firstInput'>
                            <input type="text" {...register("name", { required: true })} placeholder='Enter your Full Name' fullWidth />
                        </div>
                        <p className='errorStyle'>{errors.name?.type === "required" && "Please enter your email"} </p>
                        <div align='center'>
                            <input type="text" {...register("email", { required: true })} placeholder='Enter your email' fullWidth />
                        </div>
                        <p className='errorStyle'>{errors.email?.type === "required" && "Please enter your email"} </p>
                        <div align='center'>
                            <input type="password" {...register("password", { required: true })} placeholder='password' />
                        </div>
                        <p className='errorStyle'>{errors.password?.type === "required" && "Please enter your password"} </p>
                        <div align='center'>
                            <input type="password" {...register("confirmPassword", {
                                required: true,
                                validate: (val) => {
                                    if (watch('password') != val) {
                                        return "Your passwords do no match";
                                    }

                                },
                            })} placeholder='Confirm Password' />
                        </div>
                        {errors.confirmPassword?.type === "required" &&
                            <p className='errorStyle'>Please re-enter your password </p>
                        }
                        <p className='errorStyle'>{errors.confirmPassword?.message} </p>

                        <div align='center'>
                            <button type='submit' variant='contained' className="btnStyle" >Submit</button>
                        </div>
                        <div className='note'>
                            Alreday have an account? <Link to="/login" style={{ color: '#527a7a' }}>Login</Link>
                        </div>
                    </form>
                </div >
            </Paper>
        </div>
    )

    return (
        <div>
            {isAuthenticated() ? <Redirect to="/todo" /> : ""}
            {registrationForm()}
        </div>

    )
}