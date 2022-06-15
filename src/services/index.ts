const apiUrl = "https://virtserver.swaggerhub.com/Arthur-Coppey/uber-cesi/1.0.0/";

function buildUrl(url: string) {
    return apiUrl + url;
}

export function GET(url: string) {
    return fetch(buildUrl(url))
        .then(response => response.json())
        .catch(error => console.error(error));
};

export function POST(url: string, data: any) {
    return fetch(buildUrl(url), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.error(error));
};

export function DELETE(url: string) {
    return fetch(buildUrl(url), {
        method: "DELETE"
    })
        .then(response => response.json())
        .catch(error => console.error(error));
};
