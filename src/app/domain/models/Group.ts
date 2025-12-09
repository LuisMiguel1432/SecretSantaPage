import { User } from "./User";

export interface Group{
    id: number | null;
    groupName: string;
    admin: User;
    members: User[];
}