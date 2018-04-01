const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yourEmail@gmail.com',
        pass: 'yourPassword'
    }
});

app.get('/', (req, res) => {
    res.send('Email Rest API');
});

app.post('/:emailId/:subject/:body', (req, res) => {
    const emailId = req.params.emailId;
    const sub = req.params.subject;
    const body = req.params.body;
    let mail = {
        from: 'yourEmail@gmail.com',
        to: emailId,
        subject: sub,
        text: body,
    };
    transporter.sendMail(mail, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Mail sent: ' + info.res);
        }
    });
});

module.exports = app;