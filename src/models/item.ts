import { Option } from "./itemOption";

export interface Item {
    id: number;
    name: string;
    description: string;
    allergens: Array<string>;
    price: number;
    restaurantId: string;
    options: Array<Option>;
};
