"use strict";

var _require = require('sequelize'),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var sequelize = new Sequelize('postgres://postgres:admin@127.0.0.1:5432/bedu_travels'); // Example for postgres

var Destination = sequelize.define("destinations", {
  title: DataTypes.TEXT,
  description: DataTypes.TEXT,
  image: DataTypes.TEXT
}, {
  timestamps: false
});
var User = sequelize.define("users", {
  email: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: false
});

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(sequelize.sync({
            force: false
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
})();

module.exports = {
  Destination: Destination,
  User: User
}; // async function connect(){
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }
// module.exports = connect;