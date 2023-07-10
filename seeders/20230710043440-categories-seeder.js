'use strict';
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

    return queryInterface.bulkInsert(
      "categories",
      [{
        id: uuidv4(),
        name: 'Electronics',
        description: 'All kinds of electronic devices',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Books',
        description: 'A wide variety of books',
        created_at: new Date(),
        updated_at: new Date()
      }, {
        id: uuidv4(),
        name: 'Clothing',
        description: 'Men, women and children clothing',
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
    return Sequelize.bulkDelete("categories", null, {});
  }
};
