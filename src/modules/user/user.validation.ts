import { z } from 'zod';

export const FullNameValidationSchema = z.object({
  firstName: z.string().min(2).max(20).trim(),
  lastName: z.string().min(2).max(20).trim(),
});

export const AddressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(2),
});

export const OrdersValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().nonnegative(),
});

export const UserValidationSchema = z.object({
  userId: z.number().nonnegative(),
  username: z.string().min(2).max(20),
  password: z.string().min(5),
  fullName: FullNameValidationSchema,
  age: z.number().min(10),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
  orders: z.array(OrdersValidationSchema).optional(),
  isDeleted: z.boolean().optional(),
});
