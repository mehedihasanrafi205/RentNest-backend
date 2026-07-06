import bcrypt from 'bcrypt';

import { jwtUtils } from '../../utils/jwt';
import config from '../../config';
import { User } from '../../generated/prisma/client';
import { prisma } from '../../lib/prisma';


const registerUserIntoDB = async (payload: User) => {
  // 1. Password Hashing
  const hashedPassword = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds || 10));
  
  // 2. Save User to DB
  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isBanned: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const loginUser = async (payload: any) => {
  // 1. Check if user exists
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new Error('User not found with this email!');
  }

  // 2. Check if user is banned
  if (user.isBanned) {
    throw new Error('Your account is banned. Contact support.');
  }

  // 3. Match password
  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatched) {
    throw new Error('Incorrect password!');
  }

  // 4. Create JWT Payload
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  // 5. Generate Access Token
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    (config.jwt_access_expires_in || '1d') as string
  );

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const AuthServices = {
  registerUserIntoDB,
  loginUser,
};