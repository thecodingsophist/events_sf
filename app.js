const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// let events = [
//   { eventTitle: "Sunset Yoga" },
//   { eventTitle: "Frisbee at Mission Dolores" },
//   { eventTitle: "Corgis Unite!" }
// ]

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/events_sf');

const Event = mongoose.model('Event', {
  eventTitle: String,
  description: String,
  eventDate: Date
});

// INDEX
app.get('/', (req, res) => {
    Event.find()
        .then(events => {
            res.render('events-index', { events: events });
        })
        .catch(err => {
            console.log(err);
        })
})

// NEW
app.get('/events/new', (req, res) => {
  res.render('events-new', {});
})

// CREATE
app.post('/events', (req, res) => {
  Event.create(req.body).then((event) => {
      console.log(event);
      res.redirect('/');
  }).catch((err) => {
      console.log(err.message);
  })
})
