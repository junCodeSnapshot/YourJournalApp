import { types } from "../types/types"

export const setErrorAction = (error) => ({
    type: types.uiSetError,
    payload: error,
})

export const removeError = () => ({
    type: types.uiRemoveError
})

export const uiStarLoading = () =>(
    {
        type: types.uiStartLoading
    }
)

export const uiFinishLoading = () => (
    {
        type: types.uiFinishLoading
    }
)