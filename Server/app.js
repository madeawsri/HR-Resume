require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors')

const loginRouter = require('./api/login/router')
const profileRouter = require('./api/profile/router')
const familyRouter = require('./api/family/router')
const educationRouter = require('./api/education/router')
const workRouter = require('./api/work/router')
const trainingRouter = require('./api/training/router')
const knowledgeRouter = require('./api/knowledge/router')

const proofRouter = require('./api/proofs/router')
const qualifyRouter = require('./api/qualify/router')

app.use(express.json());
//app.options('*', cors())
app.use(cors())
    //app.use(cors({ origin: true, credentials: true }));
    /*
    const whitelist = ['http://10.7.10.26', 'http://192.168.2.2'];
    const corsOptions = {
        credentials: true, // This is important.
        origin: (origin, callback) => {
            if (whitelist.includes(origin))
                return callback(null, true)

            callback(new Error('Not allowed by CORS'));
        }
    }
    app.use(cors(corsOptions));
    */


app.use("/api/login", loginRouter);
app.use("/api/profile", profileRouter);
app.use('/api/family', familyRouter)
app.use('/api/education', educationRouter)
app.use('/api/work', workRouter)
app.use('/api/training', trainingRouter)
app.use('/api/knowledge', knowledgeRouter)

app.use('/api/proof', proofRouter)
app.use('/api/qualify', qualifyRouter)
app.use('/api/position', require('./api/position/router'))
app.use('/api/benefits', require('./api/benefits/router'))
app.use('/api/jobattr', require('./api/jobattr/router'))
app.use('/api/jobs', require('./api/jobs/router'))
app.use('/api/jobinterest', require('./api/jobinterest/router'))
app.use('/api/register', require('./api/register/router'))
app.use('/api/interview', require('./api/interview/router'))

app.use('/api/linenotify', require('./api/linenotify/router'))

app.use('/api/promise', require('./api/promise/router'))


app.get('/user/:id(\\d+)', function(req, res) {
    res.send({ msg: 'params is number ', data: req.params });
});
app.get('/user/:id(\s+)', function(req, res) {
    res.send({ msg: 'params is string ', data: req.params });
});


const port = process.env.PORT;
const host = process.env.HOST;
const server = app.listen(port, host, () => {
    console.log("app listening at http://%s:%s", host, port)
});