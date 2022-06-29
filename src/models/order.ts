import { Menu } from "./menu";

export interface Order {
    _id?: string;
    customerId: string;
    delivererId?: string;
    restaurantId: string;
    address: string;
    totalPrice: number;
    tipAmount: number;
    status: string;
    menus: string | Array<Menu>;
};
