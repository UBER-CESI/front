import { Value } from "./itemOptionValue";

export interface Option {
    name: string;
    multiple: boolean;
    required: boolean;
    values: Array<Value>;
};