import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import amqp from 'amqplib';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.info('Email sent:', info.response);
    }
  });
};

const startConsumer = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'emailQueue';

    channel.assertQueue(queue, { durable: true });

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const { to, subject, text } = JSON.parse(msg.content.toString());
        sendEmail(to, subject, text);
        channel.ack(msg);
      }
    });

    console.log('Email consumer started');
  } catch (error) {
    console.error('Failed to start email consumer', error);
  }
};

startConsumer();