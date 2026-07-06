import { prisma } from "../../lib/prisma";
import { TPropertyFilterRequest, TPropertyPayload } from "./property.interface";

const createPropertyIntoDB = async (
  payload: TPropertyPayload,
  landlordId: string,
) => {
  const result = await prisma.property.create({
    data: {
      ...payload,
      landlordId,
    },
  });
  return result;
};

const getAllPropertiesFromDB = async (filters: TPropertyFilterRequest) => {
  const { search, location, minPrice, maxPrice, categoryId, amenities } = filters;

  const whereConditions: any = { status: "AVAILABLE" };

  if (search) {
    whereConditions.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (location) {
    whereConditions.location = { contains: location, mode: "insensitive" };
  }

  if (minPrice || maxPrice) {
    whereConditions.price = {};
    if (minPrice) whereConditions.price.gte = Number(minPrice);
    if (maxPrice) whereConditions.price.lte = Number(maxPrice);
  }

  if (categoryId) {
    whereConditions.categoryId = categoryId;
  }

  if (amenities) {
    // Expecting amenities as comma-separated string, e.g. "Wifi,Parking"
    const amenitiesArray = amenities.split(',').map((a) => a.trim());
    whereConditions.amenities = {
      hasSome: amenitiesArray,
    };
  }

  const result = await prisma.property.findMany({
    where: whereConditions,
    include: {
      landlord: {
        select: { id: true, name: true, email: true },
      },
    },
  });
  return result;
};

const getSinglePropertyFromDB = async (id: string) => {
  const result = await prisma.property.findUnique({
    where: { id },
    include: {
      landlord: { select: { id: true, name: true } },
    },
  });
  return result;
};

export const PropertyServices = {
  createPropertyIntoDB,
  getAllPropertiesFromDB,
  getSinglePropertyFromDB,
};
