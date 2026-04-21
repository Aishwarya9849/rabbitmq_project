const amqp = require("amqplib");

const URL = "amqp://localhost";
const EXCHANGE = "logs_exchange";
const ROUTING_KEY = "logs";

async function sendNotificationLog() {
    const connection = await amqp.connect(URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE, "direct", { durable: true });

    const log = {
        module: "Notifications",
        message: "Email sent"
    };

    channel.publish(
        EXCHANGE,
        ROUTING_KEY,
        Buffer.from(JSON.stringify(log)),
        { persistent: true }
    );

    console.log("Notification log sent");

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}

sendNotificationLog();
