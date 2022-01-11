import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeletingNote } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppbar } from './NotesAppbar'

export const NoteScreen = () => {
    const { active: note } = useSelector(state => state.notes)
    const dispatch = useDispatch()


    const [formValues, handleInputChange, reset] = useForm(note)
    const activeID = useRef(note.id)

    useEffect(() => {
        if (note.id !== activeID.current) {
            reset(note)
            activeID.current = note.id
        }
    }, [reset, note])

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }))
    }, [formValues, dispatch])

    const { title, body } = formValues

    const handleDelete = () => {
        dispatch(startDeletingNote(note.id))
    }

    
    return (
        <div className='note__main-content'>
            < NotesAppbar />
            <div className='notes__content'>
                <input type='text' placeholder='Add a title'
                    className='notes__title-input' value={title} name='title' onChange={handleInputChange} />
                <textarea placeholder='Add a note for today' className='notes__textarea' value={body} name='body' onChange={handleInputChange}></textarea>
                {
                    note.url
                        &&
                        <div className='notes__image'>
                            <img src={note.url} alt="#" />
                        </div>
                        
                }
            </div>
            <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
        </div>
    )
}