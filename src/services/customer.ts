import { Customer } from "../models/customer";
import { POST, GET, PUT, DELETE } from "./index";

const customerUrl: string = "customer/";

export function createCustomer(customer: Customer) {
    return PUT(customerUrl + "register", customer);
};

export function getCustomer(id: number) {
    return GET(customerUrl + id);
};

export function updateCustomer(id: number, customer: Customer) {
    return POST(customerUrl + id, customer);
};

export function deleteCustomer(id: number) {
    return DELETE(customerUrl + id);
};

export function getCustomerHistory(id: number) {
    return GET(customerUrl + id + "/history");
};
