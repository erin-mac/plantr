const { db, Plot, Vegetable, Gardener } = require('./models')

function seedThisShit() {
  db.authenticate()
    .then(() => db.sync({ force: true }))
    .then(async () => {
      const [carrot, potatoes, kale] = await Promise.all([
        Vegetable.create({
          name: 'carrot',
          color: 'purple',
          planted_on: new Date(Date.UTC(2016, 0, 1))
        }),
        Vegetable.create({
          name: 'potatoes',
          color: 'orange',
          planted_on: new Date(Date.UTC(2018, 11, 1))
        }),
        Vegetable.create({
          name: 'kale',
          color: 'blood',
          planted_on: new Date(Date.UTC(0, 11, 25))
        })
      ])
      const [jerry, elaine] = await Promise.all([
        Gardener.create({
          name: 'jerry',
          age: 5,
          favVegId: kale.id
        }),
        Gardener.create({
          name: 'elaine',
          age: 95,
          favVegId: kale.id
        })
      ])
      const [jerrysPlot, elainesPlot] = await Promise.all([
        Plot.create(
          {
            size: 1500,
            shaded: true,
            gardenerId: jerry.id,
            vegetables: [
              {
                name: kale.name
              },
              {
                name: potatoes.name
              }
            ]
          },
          {
            include: Vegetable
          }
        ),
        Plot.create(
          {
            size: 9000,
            shaded: true,
            gardenerId: elaine.id,
            vegetables: [
              {
                name: kale.name
              },
              {
                name: carrot.name
              }
            ]
          },
          {
            include: Vegetable
          }
        )
      ])
    })
    .then(() => {
      db.close()
    })
}

seedThisShit()

module.exports = seedThisShit
