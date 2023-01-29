import { api, requestConfig } from '../utils/config';

const publishPhoto = async (data, token) => {
    const config = requestConfig('POST', data, token, true);

    try {
        const res = await fetch(api + '/photo', config)
            .then(res => res.json())
            .catch(err => err);

        return res;
    } catch (error) {
        console.log(error.message);
    }
};

const getUserPhotos = async (id, token) => {
    const config = requestConfig('GET', null, token);

    try {
        const res = await fetch(api + '/photo/user/' + id, config)
            .then(res => res.json())
            .catch(err => err)

        return res;
    } catch (error) {
        console.log(error.message);
    }
};

const deletePhoto = async (id, token) => {
    const config = requestConfig('DELETE', null, token);

    try {
        const res = await fetch(api + '/photo/' + id, config)
            .then(res => res.json())
            .catch(err => err)

        return res;
    } catch (error) {
        console.log(error.message);
    }
};

const updatePhoto = async (data, id, token) => {
    const config = requestConfig('PUT', data, token);

    try {
        const res = await fetch(api + '/photo/' + id, config)
            .then(res => res.json())
            .catch(err => err)

        return res;
    } catch (error) {
        console.log(error.message);
    }
}

const getPhoto = async (id, token) => {
    const config = requestConfig('GET', null, token);

    try {
        const res = await fetch(api + '/photo/' + id, config)
            .then(res => res.json())
            .catch(err => err)

        return res;
    } catch (error) {
        console.log(error.message);
    }
}

const like = async (id, token) => {
    const config = requestConfig('PUT', null, token);

    try {
        const res = await fetch(api + '/photo/like/' + id, config)
            .then(res => res.json())
            .catch(err => err)

        return res;
    } catch (error) {
        console.log(error.message);
    }
}

const comment = async (data, id, token) => {
    const config = requestConfig('PUT', data, token)

    try {
        const res = await fetch(api + '/photo/comment/' + id, config)
            .then(res => res.json())
            .catch(err => err)

        return res;
    } catch (error) {
        console.log(error.message);
    }
}

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    comment
};

export default photoService;