import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startUploading, updateData } from '../../actions/notes'

export const NotesAppbar = () => {

    const dispatch = useDispatch()
    const {id, title, body, date, url} = useSelector(state => state.notes.active)
    const {uid} = useSelector(state => state.auth)

    const handleSaveDoc = () =>{
        dispatch(updateData(uid, id, {title, body, date, url}))
    }

    const handlePicture = () => {
        document.querySelector('#fileSelector').click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if(file){
            dispatch(startUploading(file))
        }
    }

    return(
        <div className='notes__appbar'>
            <span className='text-center'>28 de agosto 2020</span>
  
            <input id='fileSelector' name='file' type='file' style={{display: 'none'}} onChange={handleFileChange}/>

            <div>
                <button className='btn' onClick={handlePicture}>Picture</button>
                <button className='btn' onClick={handleSaveDoc}>Save</button>
            </div>
        </div>
    )
}