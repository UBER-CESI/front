import { Item } from "./item";

export interface Menu {
    _id: number;
    __v: string;
    name: string;
    description: string;
    price: number;
    items: Array<Item>;
};
