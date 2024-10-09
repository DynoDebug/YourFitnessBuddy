const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const MuscleGroup = sequelize.define('MuscleGroup', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Exercise = sequelize.define('Exercise', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
});

MuscleGroup.hasMany(Exercise);
Exercise.belongsTo(MuscleGroup);

sequelize.sync();

module.exports = { sequelize, User, MuscleGroup, Exercise };