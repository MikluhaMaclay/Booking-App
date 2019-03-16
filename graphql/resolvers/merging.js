const Event = require("../../models/event");
const User = require("../../models/user");

const { dateToString } = require("../../helpers/date");

const transformedEvent = event => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    _id: event.id,
    creator: user.bind(this, event.creator)
  };
};

const transformedBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    event: singleEvent.bind(this, booking.event),
    user: user.bind(this, booking.user),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

const events = eventIds => {
  return Event.find({ _id: { $in: eventIds } })
    .then(events => {
      if (!events) {
        throw new Error("No such event");
      }
      return events.map(event => {
        return transformedEvent(event);
      });
    })
    .catch(err => {
      throw err;
    });
};

const singleEvent = eventId => {
  return Event.findById(eventId)
    .then(event => {
      return transformedEvent(event);
    })
    .catch(err => {
      throw err;
    });
};

const user = userId => {
  return User.findById(userId)
    .then(user => {
      return {
        ...user._doc,
        _id: user.id,
        password: null,
        createdEvents: events.bind(this, user._doc.createdEvents)
      };
    })
    .catch(err => {
      throw err;
    });
};

exports.user = user;
exports.singleEvent = singleEvent;
exports.transformedEvent = transformedEvent;
exports.transformedBooking = transformedBooking;
