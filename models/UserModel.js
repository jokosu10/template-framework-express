'use strict';
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      defaultValue: "",
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Please input username"
        },
        min: {
          args: 4,
          msg: "Name must start with a letter, have no spaces, and be at least 3 characters."
        },
        max: {
          args: 100,
          msg: "Name must start with a letter, have no spaces, and be at less than 40 characters."
        },
        is: {
          args: /^[A-Za-z][A-Za-z0-9-]*\s?[A-Za-z][A-Za-z0-9-]*\s?[A-Za-z][A-Za-z0-9-]+$/gi, // must start with letter and only have letters, numbers, dashes
          msg: "Name must start with a letter and be 3 - 40 characters."
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      defaultValue: "",
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "Please input email."
        },
        isEmail: {
          msg: "Format email is wrong."
        }
      },
    },
    password: {
      type: Sequelize.STRING,
      defaultValue: "",
      allowNull: false,
      required: true,
      validate: {
        notEmpty: {
          msg: "Please input password"
        }
      }
    },
    created_at: {
      type: Sequelize.DATE(),
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updated_at: {
      type: Sequelize.DATE(),
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  }, {
    underscored: true
  });

  return User;
};
