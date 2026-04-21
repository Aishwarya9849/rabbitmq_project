const amqp = require("amqplib");

const URL = "amqp://localhost";
const EXCHANGE = "logs_exchange";
const ROUTING_KEY = "logs";

async function sendPaymentLog() {
    const connection = await amqp.connect(URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE, "direct", { durable: true });

    const log = {
        module: "Payments",
        message: "Payment successful"
    };

    channel.publish(
        EXCHANGE,
        ROUTING_KEY,
        Buffer.from(JSON.stringify(log)),
        { persistent: true }
    );

    console.log("Payment log sent");

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}

sendPaymentLog();
