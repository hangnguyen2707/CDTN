import actionTypes from "../actions/actionTypes";

const initState = {
    warehouses: []
}

const warehouseReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GET_WAREHOUSES:
            return {
                ...state,
                warehouses: action.data || [],
                msg: action.msg || ''
            }
        
        default:
            return state;
    }
}

export default warehouseReducer