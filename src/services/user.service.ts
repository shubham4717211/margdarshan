import { Injectable } from '@nestjs/common';
import { UserDataService } from 'src/data/user.data.service';
import { OnBoardDto } from 'src/dto/on-board.dto';



@Injectable()
export class UserService {
  constructor(private readonly userDataService: UserDataService) {}

  async onBoard(userId:string,onBoardDto: OnBoardDto, ) {
    const createdUser = await this.userDataService.updateUser(userId, onBoardDto)
    if (createdUser){
      return 'User Updated'
    }
  }
  async getUser(userId:string) {
    const getUser = await this.userDataService.getUserById(userId)
    return getUser

  }
}
