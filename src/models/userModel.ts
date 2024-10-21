import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from "@/lib/database";

interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  displayName: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public displayName!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'User',
    tableName: 'users',
  }
);

export default User;
