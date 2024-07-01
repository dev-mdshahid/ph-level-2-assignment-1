import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrders, TUser } from './user.interface';
import { isAlpha } from 'validator';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';
import config from '../../config';

export const FullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
    trim: true,
    validate: {
      validator: (value: string) => isAlpha(value),
      message: 'The name contains unsupported characters',
    },
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
    trim: true,
    validate: {
      validator: (value: string) => isAlpha(value),
      message: 'The name contains unsupported characters',
    },
  },
});

export const AddressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

export const OrdersSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const UserSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, '{VALUE} is larger than 20 characters'],
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: FullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  orders: {
    type: [OrdersSchema],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

UserSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// UserSchema.post('findOne', async function (doc, next) {
//   if (doc.password) {
//     delete doc.password;
//     console.log('inside doc');
//   }
//   next();
// });

export const UserModel = model<TUser>('user', UserSchema);
