const { createJob } = require('./job.controller')
const router = require('express').Router()

router.post("/", createJob)

module.exports = router