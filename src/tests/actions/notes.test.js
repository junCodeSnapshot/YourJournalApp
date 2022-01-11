import { deleteDoc, doc } from 'firebase/firestore'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startLoadingNotes, startNewNote, updateData } from '../../actions/notes'
import { db } from '../../firebase/firebase-config'
import { types } from '../../types/types'


/**
 *  @jest-enviroment node
 */
jest.setTimeout(40000)

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {
        uid: 'TESTING'
    },
    ui:{
        loading: false,
        msgError: null,
    },
    notes:{
        notes: [],
        active: null
    }
}

let store = mockStore(initState)

describe('Pruebas con las acciones de notes', () => {

    beforeEach(()=>{
        store = mockStore(initState)
    })

    test('debe de crear una nueva nota startNewNote ', async () => {
        await store.dispatch(startNewNote())

        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
                url: null
            }
        })
        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
                url: null
            }
        })

        const noteId = actions[0].payload.id
        await deleteDoc(doc(db,`TESTING/journal/notes/${noteId}`))
    })

    // test('StartLoadingNotes debe cargar la nota', () => {
    //      store.dispatch(startLoadingNotes('TESTING'))
    //     const actions= store.getActions()
    //     console.log(actions)
    //     expect(actions[0].type).toEqual(types.notesLoad)
    // })
    

    // test('startSaveNote debe de actualizar la nota',  () => {
    //     const note = {
    //         id: 'YIskBQlv11eZ5NMKziZK',
    //         title: 'titulo',
    //         body: 'aaaaaaaaa'
    //     }

    //      store.dispatch(updateData('TESTING', 'YIskBQlv11eZ5NMKziZK', note))

    //     const actions = store.getActions()

    //     console.log(actions)
    // })
    

})
