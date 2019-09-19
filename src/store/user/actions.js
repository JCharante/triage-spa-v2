import { axiosInstance } from '../../boot/axios';

export function logout({ commit }) {
    return new Promise((resolve, reject) => {
        localStorage.clear();
        commit('setSessionKey', '');
        commit('setDisplayName', '');
        resolve();
    });
}

export function login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

export function setDisplayName({ commit }, { displayName }) {
    localStorage.setItem('displayName', displayName);
    commit('setDisplayName', displayName);
}

export function setSessionDoc({ commit }, { sessionKey }) {
    localStorage.setItem('sessionKey', sessionKey);
    commit('setSessionKey', sessionKey);
}
