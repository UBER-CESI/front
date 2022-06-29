import { Item } from "./item";

export interface Menu {
    _id: number;
    __v: string;
    name: string;
    description: string;
    price: number;
    quantity?: number;
    items: Array<Item>;
};
