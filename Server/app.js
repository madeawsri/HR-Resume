require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors')

const loginRouter = require('./api/login/router')
const profileRouter = require('./api/profile/router')
const familyRouter = require('./api/family/router')
const educationRouter = require('./api/education/router')

app.use(express.json());
app.options('*', cors())

app.use("/api/login", loginRouter);
app.use("/api/profile", profileRouter);
app.use('/api/family', familyRouter)
app.use('/api/education', educationRouter)

app.get('/user/:id(\\d+)', function(req, res) {
    res.send({ msg: 'params is number ', data: req.params });
});
app.get('/user/:id(\s+)', function(req, res) {
    res.send({ msg: 'params is string ', data: req.params });
});


const port = process.env.PORT || 4000;
const host = process.env.HOST || '10.7.10.26';
const server = app.listen(port, host, () => {
    console.log("app listening at http://%s:%s", host, port)
});