const express = require('express')
const app = express()

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

let events = [
  { eventTitle: "Sunset Yoga" },
  { eventTitle: "Frisbee at Mission Dolores" },
  { eventTitle: "Corgis Unite!" }
]

// INDEX
app.get('/', (req, res) => {
  res.render('events-index', { events: events });
})
