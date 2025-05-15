const activeTokens = new Map();

function addSession(userId, token) {
    activeTokens.set(userId, token);
}

function isSessionActive(userId, token) {
    return activeTokens.get(userId) === token;
}

function logoutOtherSessions(userId) {
    activeTokens.set(userId, null);
}

module.exports = {
    addSession,
    isSessionActive,
    logoutOtherSessions
};
