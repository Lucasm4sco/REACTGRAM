import { api, requestConfig } from '../utils/config';
import makeRequest from '../utils/request';

const register = async (data) => {
    const config = requestConfig('POST', data);
    return await makeRequest(api + '/users/register', config);
}

const logout = async () => {
    localStorage.removeItem('user');
}

const login = async (data) => {
    const config = requestConfig('POST', data);
    return await makeRequest(api + '/users/login', config);
}

const authService = {
    register,
    logout,
    login
}

export default authService;