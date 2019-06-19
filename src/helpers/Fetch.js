class Fetch {

    static LOGIN_URL = 'http://localhost:3000/api/v1/login'
    static AUTH_URL = 'http://localhost:3000/api/v1/profile'
    static USERS_URL = 'http://localhost:3000/api/v1/users'
    static SETUPS_URL = 'http://localhost:3000/api/v1/setups'
    static PADS_URL = 'http://localhost:3000/api/v1/pads'

    static token() {return localStorage.getItem('token')}

    static POST(url, body) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" :"application/json",
                "Accept" :"application/json"
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
    }

    static AUTH(url, token) {
        return fetch(url, {
            headers: {
                "Authentication" : `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
    }

    static PATCH(url, body) {
        return fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type" :"application/json",
                "Accept" :"application/json",
                "Authentication" : `Bearer ${Fetch.token()}`
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
    }

    static authPOST(url, body, token) {
        return fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type" :"application/json",
                "Accept" :"application/json",
                "Authentication" : `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
    }

    static DESTROY(url, token) {
        return fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type" :"application/json",
                "Accept" :"application/json",
                "Authentication" : `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
    }

}

export default Fetch