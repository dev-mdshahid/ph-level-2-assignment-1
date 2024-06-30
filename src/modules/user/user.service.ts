import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (data: TUser) => {
  const result = await UserModel.create(data);
  const { password, ...restData } = result.toObject();
  return restData;
};

export const UserService = {
  createUserIntoDB,
};
