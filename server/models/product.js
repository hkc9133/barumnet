/* jshint indent: 2 */
const PRODUCT_STATUS_CODE = require("./PRODUCT_STATUS_CODE")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    mfg_company: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    product_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    product_info: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    product_quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    product_status: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    product_price: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    reg_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'product'
  });
};
