import { POST, GET, PUT, DELETE } from "./index";

const restaurantUrl: string = "restaurant/";

interface Restaurant {
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
};

interface Menu {
    name: string;
    description: string;
    items: Array<string>;
    price: number;
    restaurantId: string;
};

export interface Item {
    name: string;
    description: string;
    allergens: Array<string>;
    options: Array<Option>;
    price: number;
    restaurantId: string;
};

interface Option {
    name: string;
    multiple: boolean;
    required: boolean;
    values: Array<Value>;
};

interface Value {
    value: string;
    priceOffset: number;
};

export function createRestaurant(restaurant: Restaurant) {
    return PUT(restaurantUrl + "register", restaurant);
};

export function getRestaurant(id: number) {
    return GET(restaurantUrl + id);
};

export function updateRestaurant(id: number, restaurant: Restaurant) {
    return POST(restaurantUrl + id, restaurant);
};

export function deleteRestaurant(id: number) {
    return DELETE(restaurantUrl + id);
};

export function getRestaurantStats(id: number) {
    return GET(restaurantUrl + id + "/stats");
};

export function getRestaurantHistory(id: number) {
    return GET(restaurantUrl + id + "/history");
};

export function getRestaurantMenuList(restId: number) {
    return GET(restaurantUrl + restId + "/menu");
};

export function createRestaurantMenu(restId: number, menu: Menu) {
    return PUT(restaurantUrl + restId + "/menu", menu);
};

export function getRestaurantMenu(restId: number, menuId: number) {
    return GET(restaurantUrl + restId + "/menu/" + menuId);
};

export function updateRestaurantMenu(restId: number, menuId: number, menu: Menu) {
    return POST(restaurantUrl + restId + "/menu/" + menuId, menu);
};

export function deleteRestaurantMenu(restId: number, menuId: number) {
    return DELETE(restaurantUrl + restId + "/menu/" + menuId);
};

export function getRestaurantItemList(restId: number) {
    return GET(restaurantUrl + restId + "/item");
};

export function createRestaurantItem(restId: number, item: Item) {
    return PUT(restaurantUrl + restId + "/item", item);
};

export function getRestaurantItem(restId: number, itemId: number) {
    return GET(restaurantUrl + restId + "/item/" + itemId);
};

export function updateRestaurantItem(restId: number, itemId: number, item: Item) {
    return POST(restaurantUrl + restId + "/item/" + itemId, item);
};

export function deleteRestaurantItem(restId: number, itemId: number) {
    return DELETE(restaurantUrl + restId + "/item/" + itemId);
};
