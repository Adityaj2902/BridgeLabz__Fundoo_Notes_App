import { Note } from '../models/note.model';
import User from '../models/user.model';
import connectRabbitMQ from '../config/rabbitmq';

export const addCollaborator = async (noteId: string, userId: string) => {
  const note = await Note.findById(noteId);
  if (!note) {
    throw new Error('Note not found');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  note.collaborators.push(userId);
  await note.save();

  // Publish message to RabbitMQ
  const channel = await connectRabbitMQ();
  const queue = 'emailQueue';
  const message = JSON.stringify({
    to: user.email,
    subject: 'You have been added as a collaborator',
    text: `You have been added as a collaborator to the note: ${note.title}`,
  });

  channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

  return note;
};

export const removeCollaborator = async (noteId: string, userId: string) => {
  const note = await Note.findById(noteId);
  if (!note) {
    throw new Error('Note not found');
  }

  note.collaborators = note.collaborators.filter(collaborator => collaborator.toString() !== userId);
  await note.save();

  return note;
};