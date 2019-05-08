/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('popup_status', {
    popup_status: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    file_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'popup_status'
  });
};
