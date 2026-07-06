import { prisma } from "../../lib/prisma";


const getMyProfileFromDB = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!result) {
    throw new Error('User account profile not found!');
  }

  return result;
};

const updateMyProfileInDB = async (userId: string, payload: { name?: string }) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isBanned: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return result;
};

const updateUserStatusInDB = async (userId: string, isBanned: boolean) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: { isBanned },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isBanned: true,
    },
  });
  return result;
};

export const UserServices = {
  getMyProfileFromDB,
  updateMyProfileInDB,
  getAllUsersFromDB,
  updateUserStatusInDB,
};