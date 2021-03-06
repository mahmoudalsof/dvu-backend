require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { generatDefaultError, urlSlug } = require("../helpers/common");

const prisma = new PrismaClient();

exports.createPost = async (req, res, next) => {
  try {
    const { memberId, title, description } = req.body;

    const _post = await prisma.post.create({
      data: {
        title,
        description,
        member: {
          connect: {
            id: memberId,
          },
        },
      },
      select: {
        comments: true,
        title: true,
        id: true,
      },
    });

    if (_post) {
      let generatedUrlSlug = urlSlug(_post.title, _post.id);

      const _updatedPost = await prisma.post.update({
        where: { id: _post.id },
        data: {
          urlSlug: generatedUrlSlug,
        },
      });

      res.status(200).send(_post);
    }
  } catch (err) {
    generatDefaultError(err, req, next);
  }
};

exports.getAllPost = async (req, res, next) => {
  try {
    const _post = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        title: true,
        id: true,
        urlSlug: true,
        member: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        comments: {
          select: {
            createdAt: true,
            comment: true,
            member: {
              select: {
                firstName: true,
                lastName: true,
                profilePicture: true,
              },
            },
          },
        },

        createdAt: true,
      },
    });

    if (_post) {
      res.status(200).send(_post);
    }
  } catch (err) {
    generatDefaultError(err, req, next);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const _post = await prisma.post.findUnique({
      where: { id },
      select: {
        title: true,
        id: true,
        description: true,
        urlSlug: true,
        member: {
          select: {
            firstName: true,
            lastName: true,
            profilePicture: true,
            id: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            createdAt: true,
            comment: true,
            member: {
              select: {
                firstName: true,
                lastName: true,
                id: true,
              },
            },
          },
        },
        createdAt: true,
      },
    });

    if (_post) {
      res.status(200).send(_post);
    }
  } catch (err) {
    generatDefaultError(err, req, next);
  }
};

exports.searchPost = async (req, res, next) => {
  try {
    const { searchQuery } = req.body;

    const _post = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchQuery,
            },
          },
          {
            description: {
              contains: searchQuery,
            },
          },
        ],
      },
      select: {
        title: true,
        id: true,
        urlSlug: true,
        member: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        comments: {
          select: {
            createdAt: true,
            comment: true,
            member: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        createdAt: true,
      },
    });

    if (_post) {
      res.status(200).send(_post);
    }
  } catch (err) {
    generatDefaultError(err, req, next);
  }
};
