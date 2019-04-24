require("dotenv").config()

const express = require('express')
const app = express()
const cors = require('cors')

const cron = require('node-cron')
const kue = require('kue')
const queue = kue.createQueue()

const send = require('./helpers/nexmo')

const User = require('./models/user')

let weekendCron = '0 0 * * 6'
cron.schedule(weekendCron, () => {
    send('Happy weekend!')
})

queue.process('new-question', (job, done) => {
    User
        .findById(job.data.data)
        .then(found => {
            send(`${found.name} asked a new question`)
        })
        .catch(err => {
            console.log(err)
        })
    done();
})

const port = 3000

const mongoose = require("mongoose")
mongoose.set("useFindAndModify", false)

mongoose.connect(`mongodb+srv://${process.env.ATLAST_NAME}:${process.env.ATLAST_PW}@cluster0-sfchz.gcp.mongodb.net/stack-overflow?retryWrites=true`, { useNewUrlParser: true })


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const userRoutes = require('./routes/user')
const questionRoutes = require('./routes/question')
const answerRoutes = require('./routes/answer')
const tagRoutes = require('./routes/tag')

app.use('/users', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answers', answerRoutes)
app.use('/tags', tagRoutes)

app.listen(port, () => {
    console.log("listening on port" + port)
})
