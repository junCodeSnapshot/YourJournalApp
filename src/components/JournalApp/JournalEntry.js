import React from 'react'
import moment from 'moment'
import { activeNote } from '../../actions/notes';
import { useDispatch } from 'react-redux';

export const JournalEntry = ({ id, date, title, body, url}) => {
    const noteDate = moment(date)
    const dispatch = useDispatch()

    const handleEntryClick = () =>{
        dispatch(activeNote(id, {
            date, title, body, url
        }))
    }

    return (
        <div className='journal__entry animate__animated animate__bounceInDown' onClick={handleEntryClick}>


            {
                url?
                <div className='journal__entry-picture' style={{
                    backgroundImage: `url(${url})`,
                }}>
                </div>
                : 
                <div className='journal__nopicture'>No Picture</div>

            }


            <div className='jornal__entry-body'>
                <p className='journal__entry-title'>{title}</p>
                <p className='journal__entry-content'>{body}</p>
            </div>
            <div className='journal__entry-date-box'>
                <span id='day'>{moment(noteDate).format("dddd")}</span>
                <span id='day__num'>{moment(noteDate).format("Do")}</span>
            </div>
        </div>
    )

}

