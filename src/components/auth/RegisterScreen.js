import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import isEmail from 'validator/lib/isEmail'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setErrorAction } from '../../actions/ui'
import { registerWithEmailPassword } from '../../actions/auth'


export const RegisterScreen = () => {

    const dispatch = useDispatch()
    const { msgError, loading } = useSelector(state => state.ui)

    const [info, handleInputChange] = useForm()
    // {
    //     name: 'Tyler',
    //     email: 'somerandom@email.com.mx',
    //     password1: 'thesamepassword',
    //     password2: 'thesamepassword'
    // })
    const { name, email, password1, password2 } = info

    const hanldeChange = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            dispatch(registerWithEmailPassword(email, password1, name))
        }
    }
    const isFormValid = () => {

        const nameError = 'name is required',
            emailError = 'email is not valid',
            passwordError = 'password is no valid';

        if (name.trim().length === 0) {
            console.log(nameError)
            dispatch(setErrorAction(nameError))
            return false
        }
        else if (!isEmail(email)) {
            dispatch(setErrorAction(emailError))
            return false
        }
        else if (password1 !== password2 || password1.length <= 5) {
            dispatch(setErrorAction(passwordError))
            return false
        }else{
            dispatch(removeError())
            return true
        }
    }
    const clearErrorOnScreenChange = () => (dispatch(removeError()))


    return (
        <>


            <h3 className='auth__title animate__animated animate__fadeIn animate__faster'>Register</h3>
            {
                msgError && (
                    <div className='auth__alert-error animate__animated animate__headShake'>{msgError}</div>
                )
            }
            <form onSubmit={hanldeChange}>
                <input className='auth__input' type='text' placeholder='Name' name='name' autoComplete='off' value={name} onChange={handleInputChange} />
                <input className='auth__input mt-1' type='email' placeholder='Email' name='email' autoComplete='off' value={email} onChange={handleInputChange} />
                <input className='auth__input mt-1' type='password' placeholder='Password' name='password1' value={password1} onChange={handleInputChange} />
                <input className='auth__input mt-1' type='password' placeholder='Confirm' name='password2' value={password2} onChange={handleInputChange} />
                <button className='btn btn-block btn-primary mb-2' type='submit' disabled={loading}>Register</button>
            </form>
            <Link to='/auth/login' className='link link-center' onClick={clearErrorOnScreenChange}>Already Registered?</Link>

        </>
    )
}