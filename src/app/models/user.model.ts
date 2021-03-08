import { BranchOffice } from './branchOffice.model';
export class User{
    constructor(
        public name: string,
        public email: string,
        public user: string,
        public password: string,
        public role: string,
        public branchOffice: string,
        public _id?: string
    ){}
}