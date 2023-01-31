import { api, requestConfig } from '../utils/config';
import makeRequest from '../utils/request';

const publishPhoto = async (data, token) => {
    const config = requestConfig('POST', data, token, true);
    return await makeRequest(api + '/photo', config);
}

const getUserPhotos = async (id, token) => {
    const config = requestConfig('GET', null, token);
    return await makeRequest(api + '/photo/user/' + id, config);
}

const deletePhoto = async (id, token) => {
    const config = requestConfig('DELETE', null, token);
    return await makeRequest(api + '/photo/' + id, config);
}

const updatePhoto = async (data, id, token) => {
    const config = requestConfig('PUT', data, token);
    return await makeRequest(api + '/photo/' + id, config);
}

const getPhoto = async (id, token) => {
    const config = requestConfig('GET', null, token);
    return await makeRequest(api + '/photo/' + id, config);
}

const like = async (id, token) => {
    const config = requestConfig('PUT', null, token);
    return await makeRequest(api + '/photo/like/' + id, config);
}

const comment = async (data, id, token) => {
    const config = requestConfig('PUT', data, token)
    return await makeRequest(api + '/photo/comment/' + id, config);
}

const getPhotos = async (token) => {
    const config = requestConfig('GET', null, token);
    return await makeRequest(api + '/photo', config);
}

const searchPhotos = async (query, token) => {
    const config = requestConfig('GET', null, token);
    return await makeRequest(api + '/photo/search?q=' + query, config);
}

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    comment,
    getPhotos,
    searchPhotos
};

export default photoService;