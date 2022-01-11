import { notesReducer } from "../../reducers/notesReducer"
import { types } from "../../types/types"

describe('Test on notesReducer', () => {

    const initialState = {
        notes: [
            {
                title: 'a',
                body: 'b',
                url: 'kjdhaasa',
                date: 21291201
            },
            {
                title: 'xas',
                body: 'bsdada',
                url: 'kjdhsasdadasaa',
                date: 12212901
            },
            {
                title: '3e3',
                body: 'wewb',
                url: 'kjdhsasdadaa',
                date: 21292201
            }
        ],
        active: null,
    }

    test('should return the state because no one of the types is accepted', () => {
        const action = {
            type: types.ksjhdask
        }

        const state = notesReducer(initialState, action)
        expect(state).toBe(initialState)
    })

    test('should return state active as active note', () => {
        const action = {
            type: types.notesActive,
            payload: {
                title: 'a',
                body: 'b',
                url: 'kjdhaasa',
                date: 21291201,
                id: 'snjkadnajk'
            }
        }
        const state = notesReducer(initialState, action)
        initialState.active = {
            title: 'a',
            body: 'b',
            url: 'kjdhaasa',
            date: 21291201,
            id: 'snjkadnajk'
        }

        expect(state).toEqual(initialState)
    })

    test('should return a new state with the new note created', () => {

        const action = {
            type: types.notesAddNew,
            payload: {
                title: '',
                body: '',
                url: null,
                date: 21291201,
                id: 'newidnote'
            }
        }
        const state = notesReducer(initialState, action)
        initialState.notes = [action.payload, ...initialState.notes]

        expect(state).toEqual(initialState)

    })

    test('should return the state with the notes loaded from firebase sync', () => {
        const initialState = { notes: [], active: null }
        const action = {
            type: types.notesLoad,
            payload: [
                { title: 'hola buenas' }, { title: 'hola buenas tardes' }, { title: 'hola buenas tardes joven' }
            ]
        }
        const expectedState = {
            active: null,
            notes: [{ title: 'hola buenas' }, { title: 'hola buenas tardes' }, { title: 'hola buenas tardes joven' }]
        }

        const state = notesReducer(initialState, action)
        expect(state).toEqual(expectedState)

    })

    test('should actualize the notes on the state', () => {
        initialState.notes.push(
            {
                title: 'a',
                body: 'b',
                url: 'kjdhaasa',
                date: 21291201,
                id: 'snjkadnajk'
            }
        )
        const action = {
            type: types.notesUpdated,
            payload: {
                id: 'snjkadnajk',
                note: {
                    id: 'snjkadnajk',
                    title: 'abba',
                    body: 'ebbe',
                    url: 'kasajistan',
                    date: 21291201,
                }
            }
        }
        initialState.notes.pop()
        initialState.notes.push({
            id: 'snjkadnajk',
            title: 'abba',
            body: 'ebbe',
            url: 'kasajistan',
            date: 21291201,
        })

        const state = notesReducer(initialState, action)
        expect(state).toEqual(initialState)
    })


    test('should delete the expecific note and change the active status to null', () => {
        const id = 'snjkadnajk'
        const action = {
            type: types.notesDelete,
            payload: id
        }
        const state = notesReducer(initialState, action)
        initialState.notes.pop()
        initialState.active = null
        
        expect(state).toEqual(initialState)
    })
    
    test('should return no information in notes and active to null', () => {
        const initialRealState = {
            notes: [],
            active: null
        }
        const action = {
            type: types.notesLogoutCleaning
        }
        const state = notesReducer(initialState, action)
        expect(state).toEqual(initialRealState)
    })
    

})
