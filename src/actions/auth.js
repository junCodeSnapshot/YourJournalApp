// import { firebase } from "../firebase/firebase-config";
import { types } from "../types/types"
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import { uiFinishLoading, uiStarLoading } from "./ui";
import Swal from 'sweetalert2'
import { firebaseErrorHandler } from "../firebase/ErrorCode/firebaseErrorHandler";
import { noteLogout } from "./notes";


export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth()
        signInWithPopup(auth, googleAuthProvider)
        .then((result) => {
                /*const credetial= */ GoogleAuthProvider.credentialFromResult(result)
                // const token = credetial.accessToken
                const user = result.user
                dispatch(login(user.uid, user.displayName))
            }).catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                const email = error.email
                const credential = GoogleAuthProvider.credentialFromError(error)
                console.log(errorCode, errorMessage, email, credential)

            })

    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}


export const registerWithEmailPassword = (email, password, name) => {
    return (dispatch) => {
        dispatch(uiStarLoading())
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                dispatch(uiFinishLoading())
                const user = userCredential.user
                updateProfile(user, {
                    displayName: name,
                }).then(() => (dispatch(login(user.uid, user.displayName)))
                )
            })
            .catch(error => {
                const errorCode = error.code
                const errorMessage = firebaseErrorHandler(errorCode)
                Swal.fire({
                    titleText: 'Error',
                    text: errorMessage,
                    icon: 'error'
                })
            })
    }
}

export const loginWithEmailandPassword = (email, password) => {
    return (dispatch) => {
        dispatch(uiStarLoading())
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                dispatch(uiFinishLoading())
                const user = userCredential.user
                dispatch(login(user.uid, user.displayName))
            })
            .catch(error => {
                dispatch(uiFinishLoading())
                const errorCode = error.code
                const errorMessage = firebaseErrorHandler(errorCode)
                Swal.fire({
                    titleText: "Error",
                    html: errorMessage,
                    icon: "error",
                })
            })
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await getAuth().signOut()
        .catch(error => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
        })
        dispatch(logout())
        dispatch(noteLogout())
    }
}

export const logout = () => (
    {
        type: types.logout
    }
)