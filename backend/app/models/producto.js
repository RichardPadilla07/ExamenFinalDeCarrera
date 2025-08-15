module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Producto', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(10), allowNull: false },
    codigo: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    descripcion: { type: DataTypes.STRING(30) },
    categoria: { type: DataTypes.STRING(20) },
    precio: { type: DataTypes.FLOAT },
    stock: { type: DataTypes.INTEGER },
    fecha_ingreso: { type: DataTypes.DATE },
    proveedor: { type: DataTypes.STRING(20) }
  }, {
    tableName: 'productos',
    timestamps: false
  });
};