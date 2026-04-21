// const amqp = require("amqplib");

// const URL = "amqp://localhost";
// const EXCHANGE = "announcement_exchange";

// async function publish() {
//     const connection = await amqp.connect(URL);
//     const channel = await connection.createChannel();

//     await channel.assertExchange(EXCHANGE, "fanout", { durable: true });

//     const message = "Important Announcement: College will be closed tomorrow";

//     channel.publish(EXCHANGE, "", Buffer.from(message), {
//         persistent: true
//     });

//     console.log("Announcement sent:", message);

//     setTimeout(() => {
//         connection.close();
//         process.exit(0);
//     }, 500);
// }

// publish();



const amqp = require("amqplib");

async function sendAnnouncement() {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        const exchange = "announcement_exchange";
        const message = "📢 Important: College will be closed tomorrow";

        // 🔹 Fanout exchange
        await channel.assertExchange(exchange, "fanout", { durable: true });

        // ❌ No routing key needed → use ""
        channel.publish(exchange, "", Buffer.from(message));

        console.log("Announcement sent:", message);

        setTimeout(() => connection.close(), 500);

    } catch (error) {
        console.log(error);
    }
}

sendAnnouncement();
