import actionTypes from "../actions/actionTypes";

const initState = {
    packages: []
}

const packageReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GET_PACKAGES:
            return {
                ...state,
                packages: action.data || [],
                msg: action.msg || ''
            }
        
        default:
            return state;
    }
}

export default packageReducer