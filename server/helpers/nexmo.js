function send(inputmessage) {
    const Nexmo = require('nexmo');
    const nexmo = new Nexmo({
        apiKey: process.env.APIKEY,
        apiSecret: process.env.APISECRET
    })

    const from = 'Nexmo'
    const to = '62818907908'
    const text = inputmessage
    nexmo.message.sendSms(from, to, text)
}
module.exports = send