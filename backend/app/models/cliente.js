module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Cliente', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cedula: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    nombre: { type: DataTypes.STRING(10), allowNull: false },
    apellido: { type: DataTypes.STRING(10), allowNull: false },
    ciudad: { type: DataTypes.STRING(10), allowNull: false },
    email: { type: DataTypes.STRING(30), allowNull: false, unique: true },
    direccion: { type: DataTypes.STRING(20) },
    telefono: { type: DataTypes.STRING(10) },
    fecha_nacimiento: { type: DataTypes.DATE }
  }, {
    tableName: 'clientes',
    timestamps: false
  });
};