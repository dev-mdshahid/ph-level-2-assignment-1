import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

// user specific
router.post('/create-user', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

// order specific
router.post('/:userId/orders', UserController.addOrderIntoUser);
router.get('/:userId/orders', UserController.getAllOrdersOfUser);
router.get('/:userId/orders/total-price', UserController.getTotalPriceOfOrders);

export const UserRouter = router;
