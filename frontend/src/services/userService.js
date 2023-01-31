import { api, requestConfig } from '../utils/config';
import makeRequest from '../utils/request';

const profile = async (data, token) => {
    const config = requestConfig('GET', data, token);
    return await makeRequest(api + '/users/profile', config);
}

const updateProfile = async(data, token) => {
    const config = requestConfig('PUT', data, token, true);
    return await makeRequest(api + '/users/', config);
}

const getUserDetails = async (id) => {
    const config = requestConfig('GET');
    return await makeRequest(api + '/users/' + id, config);
}


const userService = {
    profile,
    updateProfile,
    getUserDetails
}

export default userService;