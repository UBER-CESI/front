import { Option } from "./itemOption";

export interface Item {
    _id?: string;
    name: string;
    description: string;
    allergens: Array<string>;
    restaurantId: string;
    options: Array<Option>;
};
