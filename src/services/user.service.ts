import { Injectable } from '@nestjs/common';
import { UserDataService } from 'src/data/user.data.service';
import { OnBoardDto } from 'src/dto/on-board.dto';



@Injectable()
export class UserService {
  constructor(private readonly userDataService: UserDataService) {}

  async onBoard(userId:string,onBoardDto: OnBoardDto, ): Promise<{ }> {
    const createdUser = await this.userDataService.updateUser(userId, onBoardDto)
    return {
      payload:''
    };
  }
}
