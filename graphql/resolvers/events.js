const Event = require("../../models/event");
const User = require("../../models/user");
const { transformedEvent} = require('./merging');

const { dateToString } = require("../../helpers/date");

module.exports = {
  events: () => {
    return Event.find()
      .then(events => {
        return events.map(event => {
          return transformedEvent(event);
        });
      })
      .catch(err => {
        throw err;
      });
  },
  createEvent: (args, req) => {
    if (!req.isAuth) {
        throw new Error('Unauthenticated!');
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: req.userId
    });
    let createdEvent;

    return event
      .save()
      .then(res => {
        createdEvent = transformedEvent(res);
        return User.findById(event.creator);
      })
      .then(user => {
        if (!user) {
          throw new Error("User doesnt exist");
        }
        user.createdEvents.push(event);
        return user.save();
      })
      .then(res => {
        return createdEvent;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
};
