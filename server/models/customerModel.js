module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("customerdata", {
    Name: {
      type: DataTypes.STRING,
      allowsNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowsNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowsNull: false,
    },
    Phone: {
      type: DataTypes.STRING,
      allowsNull: false,
    },
  });
  return Customer;
};  
