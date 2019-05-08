/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PRODUCT_STATUS_CODE', {
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'PRODUCT_STATUS_CODE'
  });
};
