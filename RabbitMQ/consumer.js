const amqp = require('amqplib')

connect()

const queue = 'tes_queue'

async function connect() {
    try {
        const connection = await amqp.connect('amqp://localhost:5672')
        const channel = await connection.createChannel();

        process.once("SIGINT", async () => {
            await channel.close()
            await connection.close()
        })

        await channel.assertQueue(queue, { durable: false })
        await channel.consume(
            queue,
            (msg) => {
                console.log('receive message :', JSON.parse(msg.content.toString()))
            },
            { noAck: true }
        )

        console.log('receive message success')
    } catch (error) {
        console.log(error)
    }
}
