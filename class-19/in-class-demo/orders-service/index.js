require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())

const AWS = require('aws-sdk')
const { AWS_REGION, SQS_QUEUE_URL } = process.env
AWS.config.update({ region: AWS_REGION })
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })

// orders look like:
// {
//   userEmail: <email>
//   itemName: <string>
//   itemPrice: <number>
//   itemQuantity: <number>
// }

app.post('/order', async (req, res) => {
  const { userEmail, itemName, itemPrice, itemQuantity } = req.body
  const sqsData = {
    MessageAttributes: {
      userEmail: {
        DataType: 'String',
        StringValue: userEmail
      },
      itemName: {
        DataType: 'String',
        StringValue: itemName
      },
      itemPrice: {
        DataType: 'Number',
        StringValue: itemPrice
      },
      itemQuantity: {
        DataType: 'Number',
        StringValue: itemQuantity
      }
    },
    MessageBody: JSON.stringify(req.body),
    MessageGroupId: 'UserOrders',
    MessageDeduplicationId: userEmail,
    QueueUrl: SQS_QUEUE_URL
  }
  try {
    const response = await sqs.sendMessage(sqsData).promise()
    console.log(`OrdersSerivce | SUCCESS: Message queued: ${response.MessageId}`)
    res.json({ success: true, message: 'Thank you for your order.' })
  } catch (err) {
    console.error(`OrdersService | ERROR: ${err}`)
    res.status(500).json({ success: false, message: 'oops' })
  }
})

const ORDERS_SERVICE_PORT = process.env.ORDERS_SERVICE_PORT || 3000
app.listen(ORDERS_SERVICE_PORT, () => console.log(`Orders service listening on ${ORDERS_SERVICE_PORT}`))
