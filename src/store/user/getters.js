export function getSessionKey(state) {
    return state.sessionKey;
}

export function getDisplayName(state) {
    return state.displayName;
}

export function isProbablySignedIn(state) {
    return state.sessionKey.length > 0;
}
