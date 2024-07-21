import axiosConfig from '../axiousConfig'

export const apiGetAllWarehouses = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/warehouse/get/all',
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


export const apiGetPointsOfWarehouse = (id) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/warehouse/get/transactionpoints/${id}`
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPackagesOfWarehouse = (id) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/warehouse/get/packages/${id}`
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


export const apiCreateNewWarehouse = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/warehouse/create',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


export const apiUpdateWarehouseById = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/warehouse/update/${payload.id}`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})