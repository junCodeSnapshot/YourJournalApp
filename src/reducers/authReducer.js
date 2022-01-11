/* Reducer de la autenticación */
/* Funcionalidad: 
El state va a estar vacío cuando el usario no esté autenticado = {}
Usuario autenticado = {
    uid: klajfhsdjklhfasjkhsdf,
    name: 'Pepé'
}
*/
import { types } from "../types/types";



export const authReducer = (state = {}, action) =>{
    switch (action.type) {
        case types.login:
            return{
                uid: action.payload.uid,
                name: action.payload.displayName,
            }
            
        case types.logout:
            return{ }
            
        default:
            return state
    }
}