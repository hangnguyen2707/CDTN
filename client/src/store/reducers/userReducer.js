import actionTypes from "../actions/actionTypes";

const initState = {
    userData: {}
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GET_USER:
            return {
                ...state,
                userData: action.dataUser || {}
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                userData: {}
            }
        default:
            return state;
    }
}

export default userReducer