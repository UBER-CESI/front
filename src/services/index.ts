const apiUrl = "https://ubercesi.sleepycat.date/";

function buildUrl(url: string) {
    return apiUrl + url;
}

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
        body: JSON.stringify(data), credentials: "same-origin"
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
        body: JSON.stringify(data), credentials: "same-origin"
    })
        .then(response => response.json())
        .catch(error => console.error(error));
};

export function DELETE(url: string) {
    return fetch(buildUrl(url), {
        method: "DELETE", credentials: "same-origin"
    })
        .then(response => response.json())
        .catch(error => console.error(error));
};
