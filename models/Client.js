module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    nom: DataTypes.STRING,
    date: DataTypes.STRING,
    email: DataTypes.STRING,
    forfait: DataTypes.STRING,
    domaine: DataTypes.TEXT,
    telephoneEntreprise: DataTypes.STRING
  })

  Client.associate = function (models) {}

  return Client
}