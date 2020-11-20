const isFunc = o => ({}.toString.call(o)) === '[object Function]';

class Xhr {

    constructor() {

        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        this.callfirst = {
            get: () => void (0),
            post: () => void (0),
            put: () => void (0),
            delete: () => void (0),
            send: () => void (0)
        };
        this.callback = {
            get: () => void (0),
            post: () => void (0),
            put: () => void (0),
            delete: () => void (0),
            send: () => void (0)
        };
        return this;
    }

    setSendCallFirst(callfirst) {
        this.callfirst.post = callfirst;
        this.callfirst.put = callfirst;
        this.callfirst.delete = callfirst;
        return this;
    }

    setSendCallBack(callback) {
        this.callback.post = callback;
        this.callback.put = callback;
        this.callback.delete = callback;
        return this;
    }

    setHeaders(obj) {
        this.headers = obj;
        return this;
    }

    addHeaders(obj) {
        for (let prop in obj)
            this.header[prop] = obj[prop];
        return this;
    }

    parse(str){
        let d;
        try {
            d = typeof str == 'string' ? JSON.parse(str) : str;
        } catch (error) {
            if ('<' == str.charAt(0))
                d = str;
            else
                throw error;
        }
        return d;
    }

    on(requestType, callfirst = false, callback = false) {
        requestType = requestType.toLowerCase();
        if (requestType === '*' || requestType == 'send') {
            if (callfirst && isFunc(callfirst)) {
                this.setSendCallFirst(callfirst);
                requestType == '*' && (this.callfirst.get = callfirst);
            }
            if (callback && isFunc(callback)) {
                this.setSendCallBack(callback);
                requestType == '*' && (this.callback.get = callback);
            }
            return this;
        }

        if (callfirst && isFunc(callfirst))
            this.callfirst[requestType] = callfirst;

        if (callback && isFunc(callback))
            this.callback[requestType] = callback;

        return this;
    }

    /**
     * réception de données 
     */
    get(URL, headers = this.headers) {

        this.callfirst.get(this);

        return new Promise((resolve, reject) => {

            const requester = new XMLHttpRequest();
            requester.open('GET', URL, true);
            for (let header in this._headers)
                requester.setRequestHeader(header, this._headers[header]);

            requester.send();
            requester.onload = () => {
                this.callback.get(this);
                if (requester.status === 200) {
                    resolve(this.parse(requester.responseText));
                } else {
                    reject(this.parse(requester.responseText));
                }
            }
        });

    }

    /**
     * envoi de données
     */
    send(URL, data, requestType = 'POST', headers = this.headers) {

        this.callfirst[requestType](this);

        return new Promise((resolve, reject) => {
            const requester = new XMLHttpRequest();
            requester.open(requestType, URL);
            for (let header in headers)
                requester.setRequestHeader(header, headers[header]);
            requester.send(JSON.stringify(data));
            requester.onload = () => {
                this.callback[requestType](this);
                resolve(requester.responseText);
            }
        });

    }

    post(URL, data, headers = this.headers) {
        return this.send(URL, data, 'POST', headers);
    }

    put(URL, data, headers = this.headers) {
        return this.send(URL, data, 'PUT', headers);
    }

    delete(URL, data, headers = this.headers) {
        return this.send(URL, data, 'DELETE', headers);
    }

};

export default new Xhr();
