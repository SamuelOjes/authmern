import nodeMailer from 'nodemailer'

const sendEmail = async (options) => {
  // This is the Nodemailer Transporter
  const transporter = nodeMailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  // This is the Message Format
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  }

  await transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Message sent: %s', info.messageId)
    }
  })
}

export default sendEmail
