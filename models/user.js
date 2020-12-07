'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Board);
    }
  };
  User.init({
    name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"名前を入力してください。"
        }
      }
    },
    pass: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"passを入力してください。"
        }
      }
    },
    mail: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"メールアドレスを入力してください。"
        },
        isEmail:{
          msg:"メールアドレスを入力してください。"
        }
      }
    },
    age: {
      type:DataTypes.INTEGER,
      validate:{
        isInt:{
          msg:"数字で入力してください。"
        },
        min:0
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};