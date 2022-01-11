import { removeError, setErrorAction, uiFinishLoading, uiStarLoading } from "../../actions/ui"
import { types } from "../../types/types"

describe('Test in ui-actions', () => {
    test('should las acciones deben de funcionar', () => {
        const action = setErrorAction('Some Error')
        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'Some Error'
        })

        const removeErrorAction =  removeError() 
        const uiStarLoadingAction =  uiStarLoading() 
        const uiFinishLoadingAction =  uiFinishLoading() 

        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        })
        expect(uiStarLoadingAction).toEqual({
            type: types.uiStartLoading
        })
        expect(uiFinishLoadingAction).toEqual({
            type: types.uiFinishLoading
        })


    })
    
})
