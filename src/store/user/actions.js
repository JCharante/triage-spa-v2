import { axiosInstance } from '../../boot/axios';

export function logout({ commit }) {
    return new Promise((resolve, reject) => {
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
