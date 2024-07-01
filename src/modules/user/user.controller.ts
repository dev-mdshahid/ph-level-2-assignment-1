import { Request, Response } from 'express';
import {
  OrdersValidationSchema,
  UserValidationSchema,
} from './user.validation';
import { UserService } from './user.service';

// create new user
const createUser = async (req: Request, res: Response) => {
  try {
    // extracting data from request body
    const { user } = req.body;

    // validating data
    const zodParsedData = UserValidationSchema.parse(user);

    // passing data to the service
    const result = await UserService.createUserIntoDB(zodParsedData);

    // sending response
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

// get all the users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

// get specific user by userId
const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.getUserByIdFromDB(Number(userId));

    // when the user is found
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data: result,
      });
    }

    // when the user is not found
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

// update a specific user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user } = req.body;

    const zodParsedData = UserValidationSchema.parse(user);

    const { result, updatedData } = await UserService.updateUserIntoDB(
      Number(userId),
      zodParsedData
    );

    if (result.matchedCount) {
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: updatedData,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

// delete user by changing property
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.deleteUserFromDB(Number(userId));

    if (result.matchedCount) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: null,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

// add order to the users
const addOrderIntoUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { order } = req.body;

    const zodParsedData = OrdersValidationSchema.parse(order);

    const result = await UserService.addOrderIntoUserDB(
      Number(userId),
      zodParsedData
    );

    if (result.matchedCount) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

// get all orders of a specific user
const getAllOrdersOfUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getAllOrdersOfUserFromDB(Number(userId));

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

// get total calcuclated price of orders of a user
const getTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.getTotalPriceOfOrdersFromDB(
      Number(userId)
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addOrderIntoUser,
  getAllOrdersOfUser,
  getTotalPriceOfOrders,
};
