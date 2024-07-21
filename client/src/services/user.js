import axiosConfig from '../axiousConfig'

export const apiGetUser = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/get/user',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetLeaders = (type) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/user/get/leaders/${type}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAllUsers = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/get/all',
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiDeleteEmployee = (id) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/user/delete/${id}`,
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


export const apiUpdateUserById = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/user/update/${payload.id}`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})