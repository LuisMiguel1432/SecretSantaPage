
import { UserDTO } from "../../infrastructure/dto/UserDTO";
import { UserAuthDTO } from "../../infrastructure/dto/UserAuthDTO";
import { User} from "../../domain/models/User";

export class UserMapper {

  static dtoToModel(dto: UserDTO): User {
    const user : User ={
      id: dto.id,
      username: dto.username,
      password: '' // Password is not included in DTO for security reasons
    }
    return user;
  };
  

  static userModelToDTO(model : User ): UserAuthDTO {
    const UserAuthDTO: UserAuthDTO = {
      username: model.username,
      password: model.password
    };
    return UserAuthDTO;
  }

  

}