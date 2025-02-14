import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
    return channel;
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
    throw error;
  }
};

export default connectRabbitMQ;