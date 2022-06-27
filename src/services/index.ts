import axios from 'axios';

const apiUrl = "https://ubercesi.sleepycat.date/";

export function buildUrl(url: string) {
    return apiUrl + url;
};

//const jar = new TC.CookieJar();
const instance = axios.create({
    withCredentials: true,
});

function buildconf(Url: string, Method: string, Body?: any) {
    return {
        method: Method,
        url: buildUrl(Url),
        headers: {
            "Content-Type": "application/json",
        },
        data: Body

    };
};

export async function login(user: any) {
    return await instance(
        buildconf(
            "login",
            "POST",
            // '{ email: ' + user.email + ', password: ' + user.password + ' }'
            user
        ))
}

async function logout() {
    return await POST("logout")
}

export function GET(url: string) {/*
    return fetch(buildUrl(url), { credentials: "same-origin" })
        .then(response => response.json())
        .catch(error => console.error(error));*/
    return instance(buildconf(url, "GET"))
        .then(((response) => response))
        .catch(error => console.error(error));
};

export function POST(url: string, data?: any) {
    /*return fetch(buildUrl(url), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: "same-origin"
    })
        .then(response => response.json())
        .catch(error => console.error(error));*/
    return instance(buildconf(url, "POST", JSON.stringify(data)))
        .then((response => response))
        .catch(error => console.error(error));
};

export function PUT(url: string, data: any) {/*
    return fetch(buildUrl(url), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: "same-origin"
    })
        .then(response => response.json())
        .catch(error => console.error(error));*/
    return instance(buildconf(url, "PUT", JSON.stringify(data)))
        .then((response => response))
        .catch(error => console.error(error));
};

export function DELETE(url: string) {/*
    return fetch(buildUrl(url), {
        method: "DELETE",
        credentials: "same-origin"
    })
        .then(response => response.json())
        .catch(error => console.error(error));*/
    return instance(buildconf(url, "DELETE"))
        .then((response => response))
        .catch(error => console.error(error));
};
