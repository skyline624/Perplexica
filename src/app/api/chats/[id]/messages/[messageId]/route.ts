import db from '@/lib/db';
import { chats, messages } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string; messageId: string }> },
) => {
  try {
    const { id, messageId } = await params;

    const chatExists = await db.query.chats.findFirst({
      where: eq(chats.id, id),
    });

    if (!chatExists) {
      return Response.json({ message: 'Chat not found' }, { status: 404 });
    }

    const messageExists = await db.query.messages.findFirst({
      where: and(eq(messages.chatId, id), eq(messages.messageId, messageId)),
    });

    if (!messageExists) {
      return Response.json({ message: 'Message not found' }, { status: 404 });
    }

    await db
      .delete(messages)
      .where(and(eq(messages.chatId, id), eq(messages.messageId, messageId)))
      .execute();

    return Response.json(
      { message: 'Message deleted successfully' },
      { status: 200 },
    );
  } catch (err) {
    console.error('Error in deleting message: ', err);
    return Response.json(
      { message: 'An error has occurred.' },
      { status: 500 },
    );
  }
};
