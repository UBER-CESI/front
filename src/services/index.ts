import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';
import axios from 'axios';

const apiUrl = "https://ubercesi.sleepycat.date/";

function buildUrl(url: string) {
    return apiUrl + url;
}

export function getCookies(credentials: any) {
    const jar = new CookieJar();
    const connector = wrapper(axios.create({ jar }));
    var config = {
        method: "post",
        url: buildUrl("login"),
        data: credentials,
        headers: {
            "Content-Type": "application/json",
        }
    }
    var configRestaurantList = {
        method: "get",
        url: buildUrl("restaurant/"),
        headers: {
            "Content-Type": "application/json",
        }
    }
    return connector(config).then(function (response) {
        return response.headers["set-cookie"];
        /*return connector(configRestaurantList).then((response) => {
            console.log(response)
        });*/
    });
};

export function GET(url: string) {
    return fetch(buildUrl(url), { credentials: "same-origin" })
        .then(response => response.json())
        .catch(error => console.error(error));
};

export function POST(url: string, data: any) {
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
