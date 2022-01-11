import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import {loginWithEmailandPassword, startGoogleLogin } from '../../actions/auth'
import isEmail from 'validator/lib/isEmail'
import { removeError, setErrorAction } from '../../actions/ui'


export const LoginScreen = () => {

    const dispatch = useDispatch()


    const {msgError, loading} = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm()
    // {
    //     email: 'pepe@gmail.com',
    //     password: '123'
    // })

    const {email, password} = formValues

    const handleLogin = (e) => {
        e.preventDefault()

        if(isFormValid()){
            dispatch(loginWithEmailandPassword(email, password))
        }

    }
    const clearErrorOnScreenChange = () => (dispatch(removeError()))

    const handleGoogleLogin = () =>{
        dispatch(startGoogleLogin())
    } 

    const isFormValid = () => {

        const emailError = 'email is not valid',
              passwordError = 'password is no valid'; 
            

        if(!isEmail(email)){
            dispatch(setErrorAction(emailError))
            return false
        }
        else if(password.length <= 5){
            dispatch(setErrorAction(passwordError))
            return false
        }

        else
            dispatch(removeError())
            return true
    }

    

    //Diseño del formulario y titulo de la ventana del login!
    return (
        <>
            <h3 className="auth__title">Login</h3>
            {
                msgError && (
                    <div className='auth__alert-error animate__animated animate__headShake'>{msgError}</div>
                )
            }
            <form onSubmit={handleLogin} className='animate__animated animate__fadeIn animate__faster'>
                <input type="text"
                    autoComplete="off"
                    placeholder="Correo Electronico"
                    name="email"
                    className="auth__input"
                    value={email}
                    onChange={handleInputChange}
                />
                <input type="password"
                    placeholder="Contraseña"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />
                <button className="btn btn-primary btn-block" disabled={loading}>
                    Login
                </button>
                <hr />
                <div className="auth__social-networks">
                    <p>Login in with Google</p>
                    <div className="google-btn" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link className='link' to="/auth/register" onClick={clearErrorOnScreenChange}>Create new account</Link>
            </form>
        </>
    )
}
