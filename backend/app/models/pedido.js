module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pedido', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    codigo: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    descripcion: { type: DataTypes.STRING(20) },
    id_cliente: { type: DataTypes.INTEGER },
    id_producto: { type: DataTypes.INTEGER }
  }, {
    tableName: 'pedidos',
    timestamps: false
  });
};