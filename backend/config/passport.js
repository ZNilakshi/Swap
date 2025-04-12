const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const AppleStrategy = require('passport-apple').Strategy;
const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: keys.google.callbackURL,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        
        if (existingUser) {
          return done(null, existingUser);
        }
        
        const newUser = await new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0].value
        }).save();
        
        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebook.clientID,
      clientSecret: keys.facebook.clientSecret,
      callbackURL: keys.facebook.callbackURL,
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ facebookId: profile.id });
        
        if (existingUser) {
          return done(null, existingUser);
        }
        
        const newUser = await new User({
          facebookId: profile.id,
          email: profile.emails ? profile.emails[0].value : `${profile.id}@facebook.com`,
          name: profile.displayName,
          avatar: profile.photos ? profile.photos[0].value : ''
        }).save();
        
        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Apple Strategy
passport.use(
  new AppleStrategy(
    {
      clientID: keys.apple.clientID,
      teamID: keys.apple.teamID,
      keyID: keys.apple.keyID,
      key: keys.apple.key,
      callbackURL: keys.apple.callbackURL,
      scope: ['name', 'email']
    },
    async (accessToken, refreshToken, idToken, profile, done) => {
      try {
        const { sub: appleId, email } = idToken;
        
        const existingUser = await User.findOne({ appleId });
        
        if (existingUser) {
          return done(null, existingUser);
        }
        
        const newUser = await new User({
          appleId,
          email: email || `${appleId}@apple.com`,
          name: profile.name ? `${profile.name.firstName} ${profile.name.lastName}` : 'Apple User'
        }).save();
        
        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);