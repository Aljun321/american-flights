const { json } = require('express')
const express = require('express')
const mysql = require('mysql')
const app = express()
const port = process.env.PORT || 3000


var connectionMySQL = mysql.createConnection({
  host: "mudb.learn.mulesoft.com",
  user: "mule",
  password: "mule",
  database: "training"
})

connectionMySQL.connect(function(error) {
  if (error) throw error
  console.log("Connected to MySQL!")
})

app.get('/flights', (request, response) => {
  let flights = []
  var destination = request.query.destination
    
  if (!destination) {
    connectionMySQL.query("SELECT * FROM american", function (error, result) {
      if (error) throw error
      result.forEach((result) => {
        let flight = {
          code: result.code1 + result.code2,
          price: result.price,
          departureDate: result.takeOffDate,
          origin: result.fromAirport,
          destination: result.toAirport,
          emptySeats: result.seatsAvailable,
          plane: {
            type: result.planeType,
            totalSeats: result.totalSeats
          }
        }
        flights.push(flight)
      })
      response.json(flights)
    })
  }
  else
    connectionMySQL.query(`SELECT * FROM american WHERE toAirport = '${destination}'`, function (error, result) {
      if (error) throw error
      result.forEach((result) => {
        let flight = {
          code: result.code1 + result.code2,
          price: result.price,
          departureDate: result.takeOffDate,
          origin: result.fromAirport,
          destination: result.toAirport,
          emptySeats: result.seatsAvailable,
          plane: {
            type: result.planeType,
            totalSeats: result.totalSeats
          }
        }
        flights.push(flight)
      })
      response.json(flights)
    })
})

app.post('/flights', (request, response) => { 
  response.json({
    message: "Flight added (but not really)"
  })
}) 

app.get('/flights/:id', (request, response) => {
  var id = request.params.id

  connectionMySQL.query(`SELECT * FROM american WHERE ID = '${id}'`, function (error, result) {
    if (error) throw error
    let flight = {
      code: result[0].code1 + result[0].code2,
      price: result[0].price,
      departureDate: result[0].takeOffDate,
      origin: result[0].fromAirport,
      destination: result[0].toAirport,
      emptySeats: result[0].seatsAvailable,
      plane: {
        type: result[0].planeType,
        totalSeats: result[0].totalSeats
      }
    }
    response.json(flight)
  })
  
})

app.put('/flights/:id', (request, response) => { 
  response.json({
    message: "Flight updated (but not really)"
  })
}) 

app.delete('/flights/:id', (request, response) => { 
  response.json({
    message: "Flight deleted (but not really)"
  })
}) 


app.listen(port, () => {
  console.log(`American Flights API listening at http://localhost:${port}`)
})