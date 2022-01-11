import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import { JournalScreen } from '../components/JournalApp/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { getAuth } from 'firebase/auth';
import { LoadingScreen } from '../components/loading/loadingScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes } from '../actions/notes';



export const AppRouter = () => {
    const auth = getAuth()
    const dispatch = useDispatch()

    const [checkin, setCheckin] = useState(true)
    const [isLoggin, setIsLoggin] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged(async user => {
            if(user?.uid){  
                dispatch(login(user.uid, user.displayName))
                setIsLoggin(true)
                const notes = await loadNotes(user.uid)
                dispatch(setNotes(notes))
            }else{
                setIsLoggin(false)
            }
            setCheckin(false)
        })
    }, [dispatch,auth, setCheckin, setIsLoggin]) 


if(checkin){
    return(
        /* Ponemos poner un screen de wait */
        <LoadingScreen />
    )
}

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" isAutenticated={isLoggin} component={AuthRouter}/>
                        
                    <PrivateRoute exact path="/" isAutenticated={isLoggin} component={JournalScreen} />
                    
                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}
