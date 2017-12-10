/**
 * DEFINE CONST
 */
const express           = require('express');                       // Minimal Framework
const exphbs            = require('express-handlebars');            // View engine
const mongoose          = require('mongoose');                      // Database
const bodyParser        = require('body-parser');                   // Node.js body parsing middleware. Available under the req.body property.
const methodOverride    = require('method-override');               // Method for CREATE, READ, UPDATE, DELETE
const flash             = require('connect-flash');                 // Flash Massages
const session           = require('express-session');               // Session
const bcrypt            = require('bcryptjs');                      // Crypt 
const passport          = require('passport');                      // Passport for Login 
                          require("./config/passport")(passport);   // Passport config
const {ensureAuthenticated} = require('./helpers/auth');            // PAssport authenticated

/**
 * Initialize app Express
 */
const app               = express();        


/**
 * Database
 */
const database = require("./config/database");
mongoose.Promise = global.Promise;
mongoose.connect(database.mongoURI, {
    useMongoClient: true
});

/**
 *  SESSION
 */
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));


/**
 *  PASSPORT MIDDLEWARE
 */
app.use(passport.initialize());
app.use(passport.session());


/**
 *  MESSAGE FLASH
 */
app.use(flash());


/**
 *  Globals VAR and Static assets
 */
app.use((req, res, next) => {
    res.locals.msg_success = req.flash("msg_success");
    res.locals.msg_error = req.flash("msg_error");
    res.locals.error = req.flash("error");
    res.locals.user = req.user;    
    next();
});


//Assets
app.use("/css", express.static(__dirname + "/assets/css"));
app.use("/img", express.static(__dirname + "/assets/img"));


/**
 *  VIEWS
 */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


/**
 *  MIDDLEWARE
 */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(methodOverride('_method'));


/**
 * Routes
 */
var routesWeb = require('./routes/web/routes');
app.use('/', routesWeb);

/**
 * Server 
 */
const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log("Server attivo sulla porta " + String(port));
});
