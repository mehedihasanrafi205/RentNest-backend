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

export const UserServices = {
  getMyProfileFromDB,
  updateMyProfileInDB,
};