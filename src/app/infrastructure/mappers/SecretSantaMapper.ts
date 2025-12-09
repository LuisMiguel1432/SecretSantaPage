import { SecretSanta } from "../../domain/models/SecretSanta";
import { SecretSantaDTO } from "../../infrastructure/dto/SecretSantaDTO";

export class SecretSantaMapper {
  static modelToDTO(model: SecretSanta): SecretSantaDTO {
    const dto: SecretSantaDTO = {
     id: model.id,
     giverName: model.giverName,
     receiverName: model.receiverName,
     groupId: model.groupId,
     hasReceived: model.hasReceived, 
     receiverId: null,
     giverId: null
    }
    
    return dto; 
    
  }
  static DTOToModel(dto: SecretSantaDTO): SecretSanta {
    const model: SecretSanta ={
       giverName: dto.giverName,
        receiverName: dto.giverName,
        groupId: dto.groupId, 
        id: dto.id,
        hasReceived: dto.hasReceived
    }
    return model;
  }

}