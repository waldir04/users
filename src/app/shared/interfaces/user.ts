import { Address } from './address';
import { Company } from './company';

export interface User {
    address: Address;
    company: Company;
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
}
