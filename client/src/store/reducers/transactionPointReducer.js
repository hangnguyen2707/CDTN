import actionTypes from "../actions/actionTypes";

const initState = {
    transactionPoints: []
}

const transactionPointReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GET_TRANSACTIONPOINTS:
            return {
                ...state,
                transactionPoints: action.data || [],
                msg: action.msg || ''
            }
        
        default:
            return state;
    }
}

export default transactionPointReducer