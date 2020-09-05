const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize( process.env.DATABASE_URL || 'postgres://postgres:admin@127.0.0.1:5432/bedu_travels') // Example for postgres

const Destination = sequelize.define("destinations", {
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT
  }, {
    timestamps: false
  });

  const User = sequelize.define("users", {
    email: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull:false,
    }
  },
  
  {
    timestamps: false
  });

  (async () => {
    await sequelize.sync({ force: false });
    // Code here
  })();

  module.exports = {
    Destination,
    User
  };
  

// async function connect(){
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }

// module.exports = connect;