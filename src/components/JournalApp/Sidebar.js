import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { JournalEntries } from './JournalEntries'
import {useSelector} from 'react-redux'
import { useName } from '../../hooks/useName'
import { startNewNote } from '../../actions/notes'


export const Sidebar = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(startLogout())
    }

    const handleAddNew = () => {
        dispatch(startNewNote())
    }
    const {name} = useSelector(state => state.auth)
    const userFirstName = useName(name)
    return(
        <aside className='journal__sidebar'>
            <div className='journal__sidebar-navbar'>
                <h3 className='mt-2'>
                    <i class="far fa-moon"></i>
                    <span>
                        {userFirstName}
                    </span>
                </h3>
                <button className='btn' onClick={handleLogout}>LogOut</button>
            </div>
            <div className='journal__newEntry' onClick={handleAddNew}>
                <i class="far fa-calendar-plus fa-5x"></i>
                <p className='mt-1'>New Entry</p>
            </div>

            <JournalEntries />
        </aside>
    )
}