import axios from 'axios'
const client = axios.create({baseURL: 'https://61d3e3feb4c10c001712bb0a.mockapi.io'})
export const request = ({...options}) => {
    client.defaults.headers.common.Authorization = `Bearer token`
    const onSuccess = (response) => response
    const onError = (error) => {
        // optionally catch errors and add additional logging here
        return error
    }
    return client(options).then(onSuccess).catch(onError)
}