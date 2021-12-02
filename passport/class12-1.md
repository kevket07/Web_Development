Passport.js

Authentication(who you are)
sessions vs cookies (cookies sent by server to cleint and saved on client session key saved in database)
JWT Auth: json web tokens...json token stored in browser's local sotage area can only be decrypted with a password on the server
OAuth and Open Id Connect:  app uses auth from 3rd parties (i.e. proceede with google) login info is stored by the 3rd party

Service based Auth (OAuth): companies like OAuth, AuthO and Okta securely store your user info


HTTP a STATELESS communication protocol.... meaning no info is being saved...passed but not saved...
 to authenticated need a STATEFUL commntication 

req res is stateless  cookies ensure persistent authentication




 vs Authorization (who is authorized)

Sign up:create user name and password s

Log In 

Log Out

app.use(require('express-session')({
    secret: "Blah blah blah",  // used to encrypt the user info before saving to db
    resave: false,             // save the session obj even if not changed
    saveUninitialized: false   // save the session obj even if not initialized
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())
