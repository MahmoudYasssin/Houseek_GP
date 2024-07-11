import { useReducer } from "react"

const initialState={
    data:[],
    search:"",
    filter:"all"
}
export const reducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case "SAVE_ALL":
            return {
                ...state,
                data:action.payload
            }
            case "UPDATE_SEARCH":
                return {
                    ...state,
                    search:action.payload
                }
            case "UPDATE_FILTER":
                return {
                    ...state,
                    filter:action.payload
                }
    }

}