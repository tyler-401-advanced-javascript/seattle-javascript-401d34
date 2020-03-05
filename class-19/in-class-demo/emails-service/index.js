// Our email service will listen to the queue and when it gets
// a new message on the queue, it will send an email
require('dotenv').config()
const AWS = require('aws-sdk')
const { Consumer } = require('sqs-consumer')
const mailgun = require('mailgun-js')

const { SQS_QUEUE_URL, MAILGUN_DOMAIN } = process.env
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN
})

AWS.config.update({ region: process.env.AWS_REGION })

const app = Consumer.create({
  queueUrl: SQS_QUEUE_URL,
  sqs: new AWS.SQS(),
  handleMessage: async message => sendEmail(message)
})

app.on('error', err => console.error(err.message))
app.on('processing_error', err => console.error(err.message))

app.start()
console.log('Emails service is running')

async function sendEmail (message) {
  const sqsMessage = JSON.parse(message.Body)
  const emailData = {
    from: 'Mailgun Sandbox <postmaster@sandbox5f7fbb326d7544c492b05975748ae17f.mailgun.org>',
    to: sqsMessage.userEmail,
    subject: 'Order Received at Stuff and Things, Inc. Ltd. Tm.',
    html: `<p>Hi ${sqsMessage.userEmail}!</p><p>Your order of ${sqsMessage.itemQuantity} ${sqsMessage.itemName} has been received and will be shipped within 4-6 business nanoseconds.</p><p>Total price: ${sqsMessage.itemPrice}</p><p>Thank you for your business.</p>`
  }
  try {
    const response = await mg.messages().send(emailData)
    console.log(`EmailsService | SUCCESS: Email sent: ${response.id}`)
  } catch (err) {
    console.error(`EmailsService | ERROR: ${err.message}`)
  }
}
