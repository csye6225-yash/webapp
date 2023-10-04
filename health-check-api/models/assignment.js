'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assignment.belongsToMany(models.Account, {
        through: models.AccountAssignment,
        foreignKey: 'assignmentId',
        otherKey: 'accountId',
        as: 'users',
      });
    }
  }
  Assignment.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID, // Corrected typo here
      defaultValue: DataTypes.UUIDV4, // You might want to add a default value
      readOnly: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false
      // validate: {
      //   min: {
      //     args: [1],
      //     msg: 'Points must be at least 1.',
      //   },
      //   max: {
      //     args: [10],
      //     msg: 'Points must be at most 10.',
      //   },
      // },
    },
    num_of_attempts: {
      type: DataTypes.INTEGER,
      allowNull: false
      // validate: {
      //   min: {
      //     args: [1],
      //     msg: 'Number of attempts must be at least 1.',
      //   },
      //   max: {
      //     args: [5],
      //     msg: 'Number of attempts must be at most 5.',
      //   },
      // },
    },

    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Assignment',
  });
  return Assignment;
};