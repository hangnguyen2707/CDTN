import actionTypes from './actionTypes';
import { apiGetUser } from '../../services/user';
export const getUser = () => async(dispatch) => {
    try {
        const response = await apiGetUser()
        // console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_USER,
                dataUser: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_USER,
                msg: response.data.msg,
                dataUser: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_USER,
            dataUser: null,
            msg: error
        })
    }
}