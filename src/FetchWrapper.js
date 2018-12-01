class FetchWrapper {
    constructor(client) {
        this.url = `//${window.location.hostname}:9000`;
        this.client = client;
    }

    async get(url, params = {}, headers = {}) {
        const qs = this.queryString(params);

        return await this.common('GET', `${url}?${qs}`, null, headers);
    }

    async post(url, body = {}, headers = {}) {
        return await this.common('POST', url, body, headers);
    }

    async put(url, body = {}, headers = {}) {
        return await this.common('PUT', url, body, headers);
    }

    async patch(url, body = {}, headers = {}) {
        return await this.common('PATCH', url, body, headers);
    }

    async delete(url, headers = {}) {
        return await this.common('DELETE', url, null, headers);
    }

    /**
     * @param {String} method HTTP verb
     * @param {String} url
     * @param {Object|null} body
     * @param {Object} headers
     * @return {Promise}
     */
    async common(method, url, body = null, headers = {}) {
        headers = this.injectToken(headers);
        headers['Content-Type'] = 'application/json';

        return await this.client(`${this.url}/${url}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        });
    }

    /**
    * Turns an object into a query string
    *
    * @param {Object} obj
    * @return {String}
    */
    queryString(obj) {
        return Object.keys(obj).map(k => {
            return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
        }).join('&');
    }

    /**
    * Inserts a token from the localStorage into the headers object for a request
    *
    * @param {Object} obj
    * @return {Object}
    */
    injectToken(obj) {
        const token = localStorage.authToken;

        if (! token) {
            return obj;
        }

        obj.Authorization = `Bearer ${token}`;

        return obj;
    }
}

export default new FetchWrapper(window.fetch.bind(window));
