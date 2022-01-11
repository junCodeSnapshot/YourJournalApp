import React from 'react'
import {Provider} from 'react-redux'
import { AppRouter } from './Routers/AppRouter'
import { store } from './store/store'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export const JournalApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
