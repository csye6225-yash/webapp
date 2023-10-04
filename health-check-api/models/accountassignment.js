'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AccountAssignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AccountAssignment.init({
    accountId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Accounts',
        key: 'id',
      },
    },

    assignmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Assignments',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'AccountAssignment',
    timestamps: false,
  });

  return AccountAssignment;

};