import actionTypes from './actionTypes';
import { apiGetUser } from '../../services/user';
import { apiGetAllTransactionPoints } from '../../services/transactionpoint';
export const getAllTransactionPoints = () => async(dispatch) => {
    try {
        const response = await apiGetAllTransactionPoints()
        // console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_TRANSACTIONPOINTS,
                data: response.data.response,
                msg: response.data.msg
            })
        } else {
            dispatch({
                type: actionTypes.GET_TRANSACTIONPOINTS,
                msg: response.data.msg,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TRANSACTIONPOINTS,
            data: null,
            msg: error
        })
    }
}