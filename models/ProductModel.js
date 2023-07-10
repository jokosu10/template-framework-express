'use strict';
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define("Product", {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			defaultValue: "",
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Please input category name"
				},
				min: {
					args: 4,
					msg: "Category name must start with a letter, have no spaces, and be at least 3 characters."
				},
				max: {
					args: 100,
					msg: "Category name must start with a letter, have no spaces, and be at less than 100 characters."
				},
				is: {
					args: /^[A-Za-z][A-Za-z0-9-]*\s?[A-Za-z][A-Za-z0-9-]*\s?[A-Za-z][A-Za-z0-9-]+$/gi, // must start with letter and only have letters, numbers, dashes
					msg: "Category name must start with a letter and be 3 - 40 characters."
				}
			}
		},
		description: {
			type: Sequelize.TEXT,
			defaultValue: "",
			allowNull: true,
		},
		price: {
			type: Sequelize.FLOAT,
			allowNull: false,
			required: true,
			defaultValue: 0,
			validate: {
				notEmpty: {
					msg: "Please input products price"
				},
			}
		},
		category_id: {
			allowNull: false,
			type: Sequelize.UUID,
			references: {
				model: 'Category', // Name of the referenced model (should match the actual model name)
				key: 'id', // Name of the referenced column in the Category model
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
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

	Product.associate = (models) => {
		Product.belongsTo(models.Category, {
			foreignKey: 'category_id',
			as: 'category',
			onDelete: 'CASCADE',
		});
	};

	return Product;
};
