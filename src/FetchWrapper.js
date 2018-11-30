class FetchWrapper {
    constructor(client) {
        this.url = `//${window.location.hostname}:9000`;
        this.client = client;
    }

    get(url, params = {}, headers = {}) {
        const qs = this.queryString(params);

        return this.common('GET', `${url}?${qs}`, null, headers);
    }

    post(url, body = {}, headers = {}) {
        return this.common('POST', url, body, headers);
    }

    put(url, body = {}, headers = {}) {
        return this.common('PUT', url, body, headers);
    }

    patch(url, body = {}, headers = {}) {
        return this.common('PATCH', url, body, headers);
    }

    delete(url, headers = {}) {
        return this.common('DELETE', url, null, headers);
    }

    common(method, url, body = null, headers = {}) {
        return this.client(`${this.url}/${url}`, {
            method,
            headers: this.injectToken(headers),
            body: body ? JSON.stringify(body) : null
        })
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
