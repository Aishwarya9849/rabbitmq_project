// const amqp = require("amqplib");

// const URL = "amqp://localhost";
// const EXCHANGE = "announcement_exchange";
// const QUEUE = "student_queue";

// async function studentConsumer() {
//     const connection = await amqp.connect(URL);
//     const channel = await connection.createChannel();

//     await channel.assertExchange(EXCHANGE, "fanout", { durable: true });

//     const q = await channel.assertQueue(QUEUE, { durable: true });
//     console.log("queue name: ", q);
//     await channel.bindQueue(q.queue, EXCHANGE, "");

//     console.log("Students waiting for announcements...");

//     channel.consume(q.queue, (msg) => {
//         if (msg) {
//             console.log("[STUDENT RECEIVED]:", msg.content.toString());
//             channel.ack(msg);
//         }
//     });
// }

// studentConsumer();

const amqp = require("amqplib");

async function studentConsumer() {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        const exchange = "announcement_exchange";

        await channel.assertExchange(exchange, "fanout", { durable: true });

        // 🔹 Create separate queue
        const q = await channel.assertQueue("", { exclusive: true });
        console.log("queue name: ", q);
        // 🔹 Bind queue to exchange
        await channel.bindQueue(q.queue, exchange, "");

        console.log("Admin waiting for announcements...");

        channel.consume(q.queue, (msg) => {
            if (msg !== null) {
                console.log("[student]:", msg.content.toString());
                channel.ack(msg);
            }
        });

    } catch (error) {
        console.log(error);
    }
}

studentConsumer();