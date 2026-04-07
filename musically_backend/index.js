// // npm init: package.json -- This is a node project
// // npm i express : express package got installed -- project came to know that we are using express
// // We finally start using express from below

// const express = require("express");
// const authRoutes = require("./routes/auth");
// const mongoose = require("mongoose");
// const cors = require('cors');
// const JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;
// const User = require("./models/User");
// const songRoutes = require("./routes/song");
// const passport = require("passport");
// const playlistRoutes = require("./routes/playlist");
// require("dotenv").config();
// const app = express();
// const port = process.env.PORT || 8000;

// app.use(cors({
//     origin: 'https://musically-frontend.onrender.com', // Allow requests from this origin
//     methods: ['GET', 'POST'], // Allow these HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());

// // COnnect to mongodb
// // If you have a password containing special character such as @, then you need to encode it by writing encodeURIComponent(Password)
// // mongoose.connect(`mongodb+srv://adarshbbest:${encodeURIComponent(process.env.MONGO_PASS)}@musicallycluster0.wvdzrpt.mongodb.net/?retryWrites=true&w=majority&appName=MusicallyCluster0`, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     socketTimeoutMS: 45000,
// //     connectTimeoutMS: 30000
    
// // }).then(() => {
// //     console.log("Connected to MongoDB");
// // }).catch((err) => {
// //     console.log(err);
// // })
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));
// // Setting up passport-jwt

// app.use(passport.initialize());

// app.use((req, res, next) => {
//     res.setHeader('Content-Type', 'application/json');
//     next();
// })


// let opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.JWT_SECRET;
// passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
//     try {
//         const user = await User.findOne({ _id: jwt_payload.identifier }).exec();
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//         }
//     } catch (err) {
//         return done(err, false);
//     }
// }));

// // API : GET type : / : return text "Hello World"

// app.get("/", (req, res) => {
//     // req variable contains all data from request
//     // res variable contains all data from response
//     res.send("Hello World");
// });

// app.use('/auth', authRoutes);

// app.use('/song', songRoutes);

// app.use('/playlist', playlistRoutes);

// // Now we need to tell our server that our server will run on above defined port

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


// /*{
//     "name": "My First Song",
//     "thumbnail": "This will be a link to thumbnail",
//     "track": "This will be a link to audio track"
// }*/

const express = require("express");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
const cors = require("cors");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/User");
const songRoutes = require("./routes/song");
const passport = require("passport");
const playlistRoutes = require("./routes/playlist");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS setup
app.use(cors({
   origin: [
        'http://localhost:3000'
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ✅ MongoDB Connection (FIXED)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ Mongo Error:", err));


// ✅ Passport setup
app.use(passport.initialize());

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        const user = await User.findOne({ _id: jwt_payload.identifier }).exec();
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));


// ✅ Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use('/auth', authRoutes);
app.use('/song', songRoutes);
app.use('/playlist', playlistRoutes);


// ✅ Server start
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});

mongoose.connection.once("open", async () => {
    // console.log("✅ Connected DB:", mongoose.connection.name);

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📂 Collections:", collections.map(c => c.name));
});