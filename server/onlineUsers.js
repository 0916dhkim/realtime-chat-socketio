// @ts-check

/**
 * Manages list of online users and each user's socket ID.
 */
class OnlineUsers {
  constructor() {
    /**
     * Maps user ID to socket ID set.
     * @type Map<number, Set<string>>
     */
    this._idMap = new Map();
  }

  /**
   * Check if the user is online.
   * @param {number} userId 
   * @returns {boolean}
   */
  has(userId) {
    return this._idMap.has(userId);
  }

  /**
   * Mark user as online.
   * @param {number} userId 
   * @param {string} socketId
   */
  add(userId, socketId) {
    if (this._idMap.has(userId)) {
      this._idMap.get(userId).add(socketId);
    } else {
      this._idMap.set(userId, new Set([socketId]));
    }
  }

  /**
   * Remove user socket on logout.
   * @param {number} userId 
   * @param {string} socketId 
   */
  remove(userId, socketId) {
    if (!this._idMap.has(userId)) return;

    const socketIdSet = this._idMap.get(userId);
    socketIdSet.delete(socketId);

    if (socketIdSet.size === 0) this._idMap.delete(userId);
  }

  /**
   * Get all socket IDs of a user.
   * @param {number} userId 
   * @returns {Set<string>}
   */
  getSockets(userId) {
    return this._idMap.get(userId) ?? new Set();
  }
}

const onlineUsers = new OnlineUsers();
module.exports = onlineUsers;
