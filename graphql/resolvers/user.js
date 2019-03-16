const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: args => {
    return User.findOne({ email: args.userInput.email })
      .then(user => {
        if (user) {
          throw new Error("User exists alredy");
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then(hashedPassword => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        });
        return user.save();
      })
      .then(result => {
        return { ...result._doc, password: null, _id: result.id };
      })
      .catch(err => {
        throw err;
      });
  },
  login: async ({email, password}) => {
    const user = await User.findOne({email: email});
    if(!user) {
        throw new Error('Incorrect credentials');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual) {
        throw new Error('Incorrect credentials');
    }
    const token = jwt.sign({userId: user.id, email: user.email}, 'secretkey', {
        expiresIn: '1h'
    });
    return {
        userID: user.id,
        token,
        tokenExpiration: 1
    }
  }
};
