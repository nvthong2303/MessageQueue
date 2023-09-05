const amqp = require('amqplib')

connect()

const queue = 'tes_queue'

async function connect() {
    try {
        const connection = await amqp.connect('amqp://localhost:5672')
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: false })
        channel.sendToQueue(queue, Buffer.from(JSON.stringify({
            name: 'nv thong',
            dob: '23 03 2000'
        })))
        console.log('job sent success')
        await channel.close()
    } catch (error) {
        console.log(error)
    }
}
