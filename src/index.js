const dotenv = require('dotenv')
const { json } = require('express')
dotenv.config()
const express = require('express')
const nodemailer = require('nodemailer')

app = express()
app.use(express.json())

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    auth: {
        user: process.env.LOGIN_EMAIL,
        pass: process.env.SENHA_EMAIL
    }
})

app.get('/', (req, res) => {

    const { destinatario, titulo, mensagem } = req.body

    enviar = transporter.sendMail({
        from: 'Paulo Mariano <paulo.mariano@uvvnet.com.br>',
        to: destinatario,
        subject: titulo,
        text: mensagem
    }).then(message => {
        console.log(message)
    }).catch(err => {
        console.log(err)
    })

    res.status(201).send()

})

app.listen(process.env.PORT, () => {

    console.log(`Servidor rodando`)

})