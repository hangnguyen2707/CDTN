import actionTypes from "../actions/actionTypes";

const initState = {
    isLogged: false,
    token: null,
    msg: ''
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLogged: true,
                token: action.data,
                msg: ''
            }
        case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGIN_FAIL:
                return {
                    ...state,
                    isLogged: false,
                    token: null,
                    msg: action.data,
                }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLogged: false,
                token: null,
                msg: '',

            }

        default: 
            return state;
    }
}

export default authReducer