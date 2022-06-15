import { POST, GET, PUT, DELETE } from "./index";

const delivererUrl: string = "deliverer";
const delivererSlashUrl: string = "deliverer/";

interface Deliverer {
    name: string;
};

export function getDelivererList() {
    return GET(delivererUrl);
};

export function createDeliverer(deliverer: Deliverer) {
    return PUT(delivererUrl, deliverer);
};

export function getDeliverer(id: number) {
    return GET(delivererSlashUrl + id);
};

export function updateDeliverer(id: number, deliverer: Deliverer) {
    return POST(delivererSlashUrl + id, deliverer);
};

export function deleteDeliverer(id: number) {
    return DELETE(delivererSlashUrl + id);
};

export function getDelivererHistory(id: number) {
    return GET(delivererSlashUrl + id + "/history");
};
