import { prisma } from '../../lib/prisma';
import { Category } from '../../generated/prisma/client';

const createCategoryIntoDB = async (payload: Partial<Category>) => {
  const result = await prisma.category.create({
    data: payload as Category,
  });
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return result;
};

const updateCategoryInDB = async (id: string, payload: Partial<Category>) => {
  const result = await prisma.category.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  const result = await prisma.category.delete({
    where: { id },
  });
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  updateCategoryInDB,
  deleteCategoryFromDB,
};
