const Conversation = require("./conversation");
const ConversationV2 = require("./conversation_v2");
const User = require("./user");
const Message = require("./message");
const Membership = require("./membership");
const MessageReceipt = require("./message_receipt");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });

Message.belongsToMany(User, { through: MessageReceipt });
User.belongsToMany(Message, { through: MessageReceipt });

ConversationV2.belongsToMany(User, { through: Membership });
User.belongsToMany(ConversationV2, { through: Membership });

module.exports = {
  User,
  Conversation,
  ConversationV2,
  Message,
  Membership,
  MessageReceipt,
};
