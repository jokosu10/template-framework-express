'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const categories = await queryInterface.sequelize.query(
      "SELECT id from categories;"
    );

    if (!categories || !categories[0] || categories[0].length === 0) {
      console.error("No categories found");
      return;
    }

    await queryInterface.bulkInsert('products', [
      {
        id: uuidv4(),
        name: 'Iphone 14 Pro Max',
        description: 'The new release iphone in 2023',
        price: 25000000,
        category_id: categories[0][0].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: "MacBook Pro 14'2 inch M2",
        description: 'The new release MacBook in 2023',
        price: 25000000,
        category_id: categories[0][0].id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Uniqlo Turtle Neck Black',
        description: 'My favorite outfit for working',
        price: 299000,
        category_id: categories[0][2].id,
        created_at: new Date(),
        updated_at: new Date()
      }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return Sequelize.bulkDelete("products", null, {});
  }
};
