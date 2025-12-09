import { User } from "../../domain/models/User";
import { UserDTO } from "./UserDTO";

export interface GroupDTO{
    id: number | null;
    groupName: string;
    admin: UserDTO;
    members: UserDTO[] ;
}