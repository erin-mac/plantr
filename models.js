const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/plantr')

const Gardener = db.define('gardener', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER
})

const Plot = db.define('plot', {
  size: Sequelize.INTEGER,
  shaded: Sequelize.BOOLEAN
})

const Vegetable = db.define('vegetable', {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  planted_on: Sequelize.DATE
})

Plot.belongsTo(Gardener)
Gardener.hasOne(Plot)
Plot.belongsToMany(Vegetable, { through: 'garden' })
Vegetable.belongsToMany(Plot, { through: 'garden' })
Gardener.belongsTo(Vegetable, { as: 'favVeg' })

module.exports = {
  db,
  Plot,
  Gardener,
  Vegetable
}
