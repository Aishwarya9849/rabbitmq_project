const amqp = require("amqplib");

const URL = "amqp://localhost";
const EXCHANGE = "logs_exchange";
const ROUTING_KEY = "logs";

async function sendAuthLog() {
    const connection = await amqp.connect(URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE, "direct", { durable: true });

    const log = {
        module: "Authentication",
        message: "User logged in"
    };

    channel.publish(
        EXCHANGE,
        ROUTING_KEY,
        Buffer.from(JSON.stringify(log)),
        { persistent: true }
    );

    console.log("Auth log sent");

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}

sendAuthLog();
