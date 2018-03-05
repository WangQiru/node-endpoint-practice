const passport = require('passport');
const LocalStrategy = require('passport-localapikey').Strategy;
const userConfig = require('../config/userConfig');

function findByApiKey(apikey, fn) {
  const {
    users,
  } = userConfig;
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.apikey === apikey) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}


passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  findByApiKey(id, (err, user) => {
    done(err, user);
  });
});


passport.use(new LocalStrategy(((apikey, done) => {
  process.nextTick(() => {
    findByApiKey(apikey, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: `Unknown apikey : ${apikey}`,
        });
      }
      return done(null, user);
    });
  });
})));


module.exports = passport;
