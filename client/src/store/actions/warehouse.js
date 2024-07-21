import actionTypes from './actionTypes';
import { apiGetUser } from '../../services/user';
import { apiGetAllWarehouses } from '../../services/warehouse';
export const getAllWarehouses = () => async(dispatch) => {
    try {
        const response = await apiGetAllWarehouses()
        // console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_WAREHOUSES,
                data: response.data.response,
                msg: response.data.msg
            })
        } else {
            dispatch({
                type: actionTypes.GET_WAREHOUSES,
                msg: response.data.msg,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_WAREHOUSES,
            data: null,
            msg: error
        })
    }
}