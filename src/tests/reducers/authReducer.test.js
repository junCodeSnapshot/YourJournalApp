import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"


describe('Test on authReducer', () => {



    test('should return the state because type not valid', () => {
        const state = authReducer({},{type: 'jksdhajdhaskdha'})
        expect(state).toEqual({})
    })
    test('should return an empty object because the user logout', () => {
        const initialState = {
            auth:{
                uid: 'u2uiuhui3huih9h89h4',
                name: 'Pepe'
            }
        }
        const state = authReducer(initialState, {type: types.logout})

        expect(state).toEqual({})
    })
    test('should return an object with the uid and name of the user logged', () => {
        const state = authReducer({}, {type: types.login, payload: {uid:'u2uiuhui3huih9h89h4', displayName:'Pepe'}})
        expect(state).toEqual({
            uid:'u2uiuhui3huih9h89h4',
            name:'Pepe'
        })
    })
    
    
})
