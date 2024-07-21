import actionTypes from './actionTypes';
import { apiRegister, apiLogin, apiEmployee, apiLeader } from '../../services/auth';
export const register = (payload) => async(dispatch) => {
    try {
        const response = await apiRegister(payload)
        console.log(response)
        if (payload.accountType === 'WAREHOUSE_LEADER' || payload.accountType === 'POINT_LEADER') {
            let leader = {
                phone: payload.phone,
                accountType: payload.accountType,
                positionId: payload.positionId
            }
            const responseLeader = await apiLeader(leader)
            console.log(responseLeader.data.msg)
        } else {
            let employee = {
                phone: payload.phone,
                accountType: payload.accountType,
                positionId: payload.positionId
            }
            const responseEmployee = await apiEmployee(employee)
            console.log(responseEmployee.data.msg)
        }
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: response.data.token
            })
        } else {
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null
        })
    }
}


export const login = (payload) => async(dispatch) => {
    try {
        const response = await apiLogin(payload)
     
        console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.token
            })
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null
        })
    }
}

export const logout = () => ({
    type: actionTypes.LOGOUT
})