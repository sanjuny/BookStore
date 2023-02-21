module.exports = (sequelize, DataTypes) => {
  const Orderbook = sequelize.define("orderdata", {
    userId: {
        type:DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING,
    },
    publishdate: {
      type: DataTypes.DATEONLY,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.TEXT("long"),
      validate: {
        len: [0, 5000],
      },
    },
  });
  return Orderbook;
};
