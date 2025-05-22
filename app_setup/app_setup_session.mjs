import session from 'express-session'
import dotenv from 'dotenv'
dotenv.config();

const sessionConf = {
secret: process.env.SESSION_SECRET,
cookie: {maxAge: 60000000, sameSite: true},
resave: false,
saveUninitialized: false,
};

const taskSession = session(sessionConf)
export default taskSession

