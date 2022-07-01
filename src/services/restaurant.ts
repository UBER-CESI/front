import { Item } from "../models/item";
import { Menu } from "../models/menu";
import { Restaurant } from "../models/restaurant";
import { POST, GET, PUT, DELETE } from "./index";

const restaurantUrl: string = "restaurant/";

export function getRestaurantList() {
    return GET("restaurant/");
};

export function createRestaurant(restaurant: Restaurant) {
    return PUT(restaurantUrl + "register", restaurant);
};

export function getRestaurant(id: string) {
    return GET(restaurantUrl + id);
};

export function updateRestaurant(id: string, restaurant: Restaurant) {
    return POST(restaurantUrl + id, restaurant);
};

export function deleteRestaurant(id: string) {
    return DELETE(restaurantUrl + id);
};

export function getRestaurantStats(id: string) {
    return GET(restaurantUrl + id + "/stats");
};

export function getRestaurantHistory(id: string) {
    return GET(restaurantUrl + id + "/history");
};

export function getRestaurantMenuList(restId: number) {
    return GET("menu/?byRestaurantId=" + restId);
};

export function createRestaurantMenu(restId: string, menu: Menu) {
    return PUT("menu/?byRestaurantId=" + restId, menu);
};

export function getRestaurantMenu(menuId: string) {
    return GET("menu/" + menuId);
};

export function updateRestaurantMenu(menuId: string, menu: Menu) {
    return POST("menu/" + menuId, menu);
};

export function deleteRestaurantMenu(menuId: string) {
    return DELETE("menu/" + menuId);
};

export function getRestaurantItemList(restId: string) {
    return GET(restaurantUrl + restId + "/item");
};

export function createRestaurantItem(item: Item) {
    return PUT("item", item);
};

export function getRestaurantItem(itemId: string) {
    return GET("item/" + itemId);
};

export function updateRestaurantItem(itemId: string, item: Item) {
    return POST("item/" + itemId, item);
};

export function deleteRestaurantItem(itemId: string) {
    return DELETE("item/" + itemId);
};
