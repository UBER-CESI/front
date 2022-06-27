import axios from 'axios';
import TC from "tough-cookie";

const apiUrl = "https://ubercesi.sleepycat.date/";

function buildUrl(url: string) {
    return apiUrl + url;
};

/*const jar = new TC.CookieJar();
var connect_sid: string = "";
const instance = axios.create({
    withCredentials: true,
});

const login = {
    method: "POST",
    url: buildUrl("login"),
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
    },
    data: { email: "c@c.com", password: "password" },
};

function buildconf(Url: string) {
    return {
        method: "GET",
        url: Url,
        headers: {
            "Content-Type": "application/json",
            Cookie: connect_sid + ";"
        },

    };
};

var truc = fonc()
async function fonc() {
    connect_sid = await tryLog();
    var test = await functiontest();
};

function functiontest() {
    return instance(buildconf(buildUrl("customer"))).then((response) => {
        console.log(response);
    }).catch((e) => {
        console.log(e);
    });
};

function tryLog(): Promise<string> {
    return instance(login).then((response) => {
        var ret = response.headers["set-cookie"]?.[0].split(";")[0];
        return ret;
    }).catch((e) => {
        return e;
    });
};*/

export function GET(url: string) {
    return fetch(buildUrl(url), { credentials: "same-origin" })
        .then(response => response.json())
        .catch(error => console.error(error));
};

export function POST(url: string, data?: any) {
    return fetch(buildUrl(url), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: "same-origin"
    })
        .then(response => response.json())
        .catch(error => console.error(error));
};

export function PUT(url: string, data: any) {
    return fetch(buildUrl(url), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: "same-origin"
    })
        .then(response => response.json())
        .catch(error => console.error(error));
};

export function DELETE(url: string) {
    return fetch(buildUrl(url), {
        method: "DELETE",
        credentials: "same-origin"
    })
        .then(response => response.json())
        .catch(error => console.error(error));
};
