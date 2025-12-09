import { Group } from "../../domain/models/Group";
import { GroupDTO } from "../../infrastructure/dto/GroupDTO";
import { UserMapper } from "./UserMapper";

export class GroupMapper{
    static modelToDto(group: Group): GroupDTO{
        return {
            id: group.id,
            groupName: group.groupName,
            admin: group.admin,
            members: group.members,
        };
    }

     static dtoToModel(dto: GroupDTO): Group{
        return {
            id: dto.id,
            groupName: dto.groupName,
            admin: UserMapper.dtoToModel(dto.admin),
            members: dto.members.map(x => UserMapper.dtoToModel(x)),
        };
    }
}