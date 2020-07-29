const { create } = require('./job.service')
    //const { genSaltSync , hashSync } = require('bcrypt')
module.exports = {
    createJob: (req, res) => {
        const body = req.body
            //const salt = genSaltSync(10)
            //body.password = hashSync(body.password, salt)
        create(body, (err, results) => {

            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "data connection error"
                })
            }
            return res.status(200).json({ success: 1, data: results })
        })
    }
}