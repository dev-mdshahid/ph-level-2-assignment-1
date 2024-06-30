import { Request, Response } from 'express';
import { UserValidationSchema } from './user.validation';
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

export const UserController = {
  createUser,
};
