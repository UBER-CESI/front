import { Item } from "./item";

export interface Order {
    id: number;
    customerId: string;
    delivererId: string;
    restaurantId: string;
    totalPrice: number;
    tipAmount: number;
    status: string;
    items: Array<Item>;
};
