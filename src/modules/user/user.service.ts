import { TOrders, TUser } from './user.interface';
import { UserModel } from './user.model';

// ---------------------- create new user
const createUserIntoDB = async (data: TUser) => {
  const result = await UserModel.create(data);

  const { password, ...restData } = result.toObject();

  return restData;
};

// ---------------------- get all the users
const getAllUsersFromDB = async () => {
  const result = await UserModel.find();

  // removing password
  const safeResult = result.map((data) => {
    const { username, fullName, age, email, address } = data.toObject();
    return { username, fullName, age, email, address };
  });

  return safeResult;
};

// ------------------------ get a specific user based on id
const getUserByIdFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

// -------------------------- update a user
const updateUserIntoDB = async (userId: number, data: TUser) => {
  // updating user
  const result = await UserModel.updateOne({ userId }, data);

  // getting the updated user
  if (result.matchedCount) {
    const updatedData = await UserModel.findOne({ userId });
    const { password, ...restData } = updatedData!.toObject();
    return {
      result,
      updatedData: restData,
    };
  }
  return { result };
};

// ------------------------ delete user
const deleteUserFromDB = async (userId: number) => {
  const result = await UserModel.updateOne({ userId }, { isDeleted: true });
  return result;
};

// ------------------------ add orders
const addOrderIntoUserDB = async (userId: number, data: TOrders) => {
  const result = await UserModel.updateOne(
    { userId },
    {
      $addToSet: {
        orders: data,
      },
    }
  );

  return result;
};

// ------------------------ get all orders
const getAllOrdersOfUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId }, { orders: 1 });
  return result;
};

// ------------------------- get total calculated price
const getTotalPriceOfOrdersFromDB = async (userId: number) => {
  const result: any = await UserModel.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: '$orders.price',
        },
      },
    },
  ]);

  const { _id, ...restData } = result[0];

  return restData;
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addOrderIntoUserDB,
  getAllOrdersOfUserFromDB,
  getTotalPriceOfOrdersFromDB,
};
