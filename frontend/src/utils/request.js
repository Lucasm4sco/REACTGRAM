const makeRequest = async (url, config) => {
    try {
        const res = await fetch(url, config)
            .then(res => res.json())
            .catch(err => err)

        return res;
    } catch (error) {
        console.log(error.message);
        return { errors: ['Não foi possível realizar a request no momento, erro: ' + error.message] }
    }
}

export default makeRequest;