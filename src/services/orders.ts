import { POST, GET, PUT, DELETE } from "./index";
import { Item } from "./restaurant";

const orderUrl: string = "order";
const orderSlashUrl: string = "order/";

export interface Order {
    customerId: string;
    delivererId: string;
    restaurantId: string;
    totalPrice: number;
    tipAmount: number;
    status: string;
    items: Array<Item>;
};

export function getOrderList() {
    return GET(orderUrl);
};

export function createOrder(order: Order) {
    return PUT(orderUrl, order);
};

export function getOrder(id: number) {
    return GET(orderSlashUrl + id);
};

export function updateOrder(id: number, order: Order) {
    return POST(orderSlashUrl + id, order);
};

export function deleteOrder(id: number) {
    return DELETE(orderSlashUrl + id);
};
