const router = require("express").Router();
const {
  Conversation,
  ConversationV2,
  Membership,
  Message,
  MessageReceipt,
} = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const legacyConversation = await Conversation.findByPk(conversationId);
      const conversationV2 = await ConversationV2.findByPk(conversationId);
      const hasUser = false;
      if (legacyConversation) {
        hasUser = await Conversation.hasUser(conversationId, senderId);
      } else if (conversationV2) {
        hasUser = !!(await Membership.findOne({
          where: {
            conversationId,
            userId: senderId,
          },
        }));
      }
      if (!hasUser) {
        return res.status(401).json({
          error:
            "Unauthorized. The sender is not a member of the conversation.",
        });
      }
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await ConversationV2.create({});
      await Membership.create({
        conversationId,
        userId: senderId,
      });
      await Membership.create({
        conversationId,
        userId: recipientId,
      });
      if (onlineUsers.has(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

// expects { messageId } in body.
router.post("/read", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { messageId } = req.body;

    const message = await Message.findByPk(messageId);
    const legacyConversation = await Conversation.findByPk(
      message.conversationId
    );
    const conversationV2 = await ConversationV2.findByPk(
      message.conversationId
    );

    if (legacyConversation) {
      if (legacyConversation.user1Id === req.user.id) {
        legacyConversation.setUser1lastread(message);
        legacyConversation.save();
      } else if (legacyConversation.user2Id === req.user.id) {
        legacyConversation.setUser2lastread(message);
        legacyConversation.save();
      } else {
        // Unauthorized.
        return res.sendStatus(401);
      }
    } else if (conversationV2) {
      await MessageReceipt.create({
        messageId: message.id,
        conversationId: conversationV2.id,
      });
    }

    res.json(true);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
