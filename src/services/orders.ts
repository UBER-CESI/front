import { Order } from "../models/order";
import { POST, GET, PUT, DELETE } from "./index";

const orderUrl: string = "order";
const orderSlashUrl: string = "order/";

export function getOrderList() {
    return GET(orderUrl);
};

export function createOrder(order: Order) {
    return PUT(orderUrl, order);
};

export function getOrder(id: number) {
    return GET(orderSlashUrl + id);
};

export function getOrdersByCustomerId(custId: number) {
    return GET(orderSlashUrl + "?byCustomerId=" + custId);
};

export function getOrdersByRestaurantId(restId: number) {
    return GET(orderSlashUrl + "?byRestaurantId=" + restId);
};

export function updateOrder(id: string, order: Order) {
    return POST(orderSlashUrl + id, order);
};

export function deleteOrder(id: number) {
    return DELETE(orderSlashUrl + id);
};
