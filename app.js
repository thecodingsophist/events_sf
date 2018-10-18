const express = require('express')
const app = express()

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
  eventTitle: String
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
