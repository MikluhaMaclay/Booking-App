const Event = require("../../models/event");

const { transformedEvent, transformedBooking } = require("./merging");
const Booking = require("../../models/booking");

module.exports = {
  bookings: (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    return Booking.find().then(bookings => {
      return bookings.map(booking => {
        return transformedBooking(booking);
      });
    });
  },
  bookEvent: (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    return Event.findOne({ _id: args.eventId })
      .then(event => {
        const booking = new Booking({
          user: req.userId,
          event: event
        });
        return booking.save();
      })
      .then(res => {
        return transformedBooking(res);
      })
      .catch(err => {
        throw err;
      });
  },
  cancelBooking: (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    return Booking.findById(args.bookingId)
      .populate("event")
      .then(booking => {
        if (!booking) {
          throw new Error("There is no such booking");
        }
        const event = transformedEvent(booking.event);
        return Booking.deleteOne({ _id: args.bookingId }).then(() => {
          return event;
        });
      })
      .catch(err => {
        throw err;
      });
  }
};
