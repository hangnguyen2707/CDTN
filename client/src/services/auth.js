import axiosConfig from '../axiousConfig'

export const apiLogin = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/login',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiEmployee = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/update/employee',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetEmployees = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        console.log(payload)
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/auth/get/employees/${payload.type}/${payload.positionId}`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiLeader = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: '/api/v1/auth/update/leader',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiSearch = (packageID) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/search',
            data: packageID
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


export const apiRegister = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/create',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})



// const AuthServices = {
//     async function
// }