import { Item } from "./item";

export interface Menu {
    id: number;
    name: string;
    description: string;
    price: number;
    restaurantId: string;
    items: Array<Item>;
};
