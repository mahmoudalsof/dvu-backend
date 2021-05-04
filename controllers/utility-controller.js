const { PrismaClient } = require("@prisma/client");
const { generateError, generatDefaultError } = require("../helpers/common");
const prisma = new PrismaClient();

exports.addNewCarModel = async (req, res, next) => {
  try {
    const { name } = req.body;

    const carModel = await prisma.carModel.create({
      data: { name },
    });

    if (carModel) {
      res.status(200).send({ msg: "Car model added successfully" });
    }
  } catch (err) {
    generatDefaultError(err, req, next);
  }
};

exports.getCarModels = async (req, res, next) => {
  try {
    const _carModels = await prisma.carModel.findMany();

    if (_carModels) {
      res.status(200).send(_carModels);
    }
  } catch (err) {
    generatDefaultError(err, req, next);
  }
};

exports.getCarColors = async (req, res, next) => {
  try {
    const _carColors = await prisma.carColor.findMany();

    if (_carColors) {
      res.status(200).send(_carColors);
    }
  } catch (err) {
    generatDefaultError(err, req, next);
  }
};

exports.getPlateEmirates = async (req, res, next) => {
  try {
    const _plateEmirates = await prisma.plateEmirate.findMany();

    if (_plateEmirates) {
      res.status(200).send(_plateEmirates);
    }
  } catch (err) {
    generatDefaultError(err, req, next);
  }
};
exports.getPlateCodes = async (req, res, next) => {
  try {
    const _plateCodes = await prisma.plateCode.findMany({
      select: {
        name: true,
        plateEmirate: true,
      },
    });

    if (_plateCodes) {
      res.status(200).send(_plateCodes);
    }
  } catch (err) {
    generatDefaultError(err, req, next);
  }
};
