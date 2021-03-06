const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { generatDefaultError } = require("../helpers/common");

exports.updateCar = async (req, res, next) => {
  try {
    const { id, plateNumber, plateCode, plateEmirate } = req.body;

    const _car = await prisma.car.update({
      where: { id },
      data: {
        plateNumber,
        plateCode,
        plateEmirate,
      },
    });

    if (_car) {
      res.status(200).send(_car);
    }
  } catch (err) {
    generatDefaultError(err, req, next);
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.body;

    const _car = await prisma.car.delete({ where: { id } });

    if (_car) {
      return res.status(200).send("Car deleted successfully");
    }
  } catch (err) {
    generatDefaultError(err, req, next);
  }
};

exports.addNewCar = async (req, res, next) => {
  try {
    const { id, cars } = req.body;

    const _member = await prisma.member.update({
      where: { id },
      select: {
        cars: true,
      },
      data: {
        cars: {
          create: cars,
        },
      },
    });

    if (_member) {
      res.status(200).send(_member.cars);
    }
  } catch (err) {
    generatDefaultError(err, req, next);
  }
};
