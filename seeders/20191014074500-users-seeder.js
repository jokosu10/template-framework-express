'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const uuid = uuidv4();
    const email = "jokosu10@opensuse.org";

    return queryInterface.bulkInsert(
      "users",
      [{
        id: uuid,
        username: "jokosu10",
        email: email,
        password: bcrypt.hashSync('1234567890', 10),
        created_at: new Date(),
        updated_at: new Date()
      }], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return Sequelize.bulkDelete("users", null, {});
  }
};