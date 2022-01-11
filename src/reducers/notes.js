import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore"
import Swal from "sweetalert2"
import { db } from "../firebase/firebase-config"
import { fileUpload } from "../helpers/fileUpload"
import { loadNotes } from "../helpers/loadNotes"
import { types } from "../types/types"

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            'url': null
        }
        try {
            const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote)
            dispatch(activeNote(docRef.id, newNote))
            dispatch(addNewNote(docRef.id, newNote))
        }
        catch (err) {
            console.log("Error adding document: ", err)
        }
    }
}

export const addNewNote = (id, note)=> ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startLoadingNotes = (uid) => {
    return (dispatch) => {
        const notes =  loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const updateData = (uid, noteId, note) => {
    return async (dispatch) => {

        if (note.id) {
            delete note.id
        }

        await setDoc(doc(db, `${uid}/journal/notes/${noteId}`), {
            ...note
        })
        dispatch(finishUpdateDoc(noteId, note))
        Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
        })
    }
}

export const finishUpdateDoc = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id, ...note
        }
    }
})

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes
        const { uid } = getState().auth
        Swal.fire({
            titleText: 'Uploading File',
            text: 'Plase wait...',
            didOpen: () => {
                Swal.showLoading()
            }
        })
        const fileUrl = await fileUpload(file)

        activeNote.url = fileUrl

        dispatch(updateData(uid, activeNote.id, activeNote))


        Swal.close()
    }
}

export const startDeletingNote = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth
        await deleteDoc(doc(db, `${uid}/journal/notes/${id}`))

        dispatch(deleteNote(id))

        Swal.fire({
            titleText: 'Note Deleted',
            icon: 'success'
        })
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id,
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning,

})