import { api, requestConfig } from '../utils/config';

const register = async (data) => {
    const config = requestConfig('POST', data);

    try {
        const res = await fetch(api + '/users/register', config)
            .then(res => res.json())
            .catch(err => err);

        if(res && !res.errors)
            localStorage.setItem('user', JSON.stringify(res));

        return res;
    } catch (error) {
        console.log(error.message)
    }
}

const logout = async () => {
    localStorage.removeItem('user');
}

const login = async (data) => {
    const config = requestConfig('POST', data);

    try {
        const res = await fetch(api + '/users/login', config)
            .then(res => res.json())
            .catch(err => err);

        if(res && !res.errors)
            localStorage.setItem('user', JSON.stringify(res));

        return res;
    } catch (error) {
        console.log(error.message)
    }
}

const authService = {
    register,
    logout,
    login
}

export default authService;