export interface Customer {
    _id: string;
    email: string;
    nickname: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    suspendedAt?: Date;
    userId: number;
};
