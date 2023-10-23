import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import { sequelize } from '../database/connection';

class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
  declare id: CreationOptional<number>;
  declare todo: string;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    todo: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: 'todo',
    sequelize
  }
)

export default Todo;