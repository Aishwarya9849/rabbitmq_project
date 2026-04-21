// const amqp = require("amqplib");

// const URL = "amqp://localhost";
// const EXCHANGE = "logs_exchange";
// const QUEUE = "logs_queue";
// const ROUTING_KEY = "logs";

// async function consumer() {
//     const connection = await amqp.connect(URL);
//     const channel = await connection.createChannel();

//     await channel.assertExchange(EXCHANGE, "direct", { durable: true });
//     await channel.assertQueue(QUEUE, { durable: true });
//     await channel.bindQueue(QUEUE, EXCHANGE, ROUTING_KEY);

//     channel.prefetch(1);

//     console.log("Consumer waiting for logs...");

//     channel.consume(QUEUE, (msg) => {
//         if (msg) {
//             const data = JSON.parse(msg.content.toString());

//             console.log(`[${data.module}] -> ${data.message}`);

//             channel.ack(msg);
//         }
//     });
// }

// consumer();

const amqp = require("amqplib");

async function recieveemail() {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        await channel.assertQueue("mail_queue", { durable: false });

        channel.consume("mail_queue", (message) => {
            if (message !== null) {
                const data = JSON.parse(message.content.toString());

                console.log(`[${data.module}] : ${data.log}`);

                channel.ack(message);
            }
        });

    } catch (error) {
        console.log(error);
    }
}

recieveemail();