import actionTypes from './actionTypes';
import { apiGetUser } from '../../services/user';
import { apiGetAllPackages } from '../../services/package';
export const getAllPackages = () => async(dispatch) => {
    try {
        const response = await apiGetAllPackages()
        // console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PACKAGES,
                data: response.data.response,
                msg: response.data.msg
            })
        } else {
            dispatch({
                type: actionTypes.GET_PACKAGES,
                msg: response.data.msg,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PACKAGES,
            data: null,
            msg: error
        })
    }
}