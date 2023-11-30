'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  submission.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      readOnly: true
    },
    assignment_id: {
      type: DataTypes.UUID,
      readOnly: true,
      allowNull: false,
      references: {
        model: 'Assignments',
        key: 'id',
      }
    },
    submission_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    account_id: {
      type: DataTypes.UUID,
      allowNull: false,
      readOnly: true,
      references: {
        model: 'Accounts',
        key: 'id',
      }
    },
  }, {
    sequelize,
    modelName: 'submission',
  });
  return submission;
};