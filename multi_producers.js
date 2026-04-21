const amqp = require("amqplib");

async function sendLog(moduleName, logMessage) {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        const exchange = 'mail_exchange';
        const routingKey = 'send_mail';

        const message = {
            module: moduleName,
            log: logMessage
        };

        await channel.assertExchange(exchange, "direct", { durable: false });
        await channel.assertQueue("mail_queue", { durable: false });
        await channel.bindQueue("mail_queue", exchange, routingKey);

        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));

        console.log("Log sent:", message);

        setTimeout(() => connection.close(), 500);

    } catch (error) {
        console.log(error); // fixed typo
    }
}

// 🔹 Three Producers
sendLog("Authentication", "User logged in");
sendLog("Payments", "Payment successful");
sendLog("Notifications", "Email sent");