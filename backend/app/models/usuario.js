module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(10), allowNull: false },
    apellido: { type: DataTypes.STRING(10), allowNull: false },
    email: { type: DataTypes.STRING(30), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(30), allowNull: false }
  }, {
    tableName: 'usuarios',
    timestamps: false
  });
};