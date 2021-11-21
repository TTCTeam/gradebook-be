import LocalStrategy from 'passport-local/lib/strategy.js';
import { checkCredential } from '../auth/authService.js';

function initializePassport (app, passport){
  
  passport.use(new LocalStrategy({ session: false },
    async function (username, password, done) {
      
      const user = await checkCredential(username, password);
      if (!user) {
        return done(null, false, "Invalid username/email and passsword.");
      } else {
        return done(null, user);
      }
    }
  ));

  app.use(passport.initialize());
}


export default initializePassport;