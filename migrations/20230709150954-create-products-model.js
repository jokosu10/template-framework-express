'use strict';
module.exports = {
  // eslint-disable-next-line
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: "",
        allowNull: false,
        required: true
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: "",
        allowNull: true
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        required: true
      },
      category_id: {
        type: Sequelize.UUID,
        references: {
          model: 'categories', // Name of the created table for categories
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }),
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
