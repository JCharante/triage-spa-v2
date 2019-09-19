import { Notify } from 'quasar';
import { baseItem } from './def';
import { axiosInstance } from '../../boot/axios';

/*
    Credit for mongObjectId() goes to https://gist.github.com/solenoid/1372386
 */
function mongoObjectId() {
    // eslint-disable-next-line no-bitwise
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
        // eslint-disable-next-line no-bitwise
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
}

export function initializeStoreFromServer({ commit, rootState }) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/', { requestType: 'getItems', sessionKey: rootState.user.sessionKey })
            .then((response) => {
                console.log(response);
                Object.values(response.data).forEach((item) => {
                    commit('addItem', item);
                });
                resolve();
            })
            .catch((err) => {
                Notify.create({
                    message: `(╯°□°）╯︵ ┻━┻ ${err.toString()}`,
                    timeout: 2000,
                });
                console.log(err);
                reject();
            });
    });
}

export function createItem({ commit, rootState }, itemName) {
    return new Promise((resolve, reject) => {
        const data = Object.assign(baseItem(), {
            task: itemName,
            id: mongoObjectId(),
        });
        commit('addItem', data);
        axiosInstance.post('/', { requestType: 'addItem', data, sessionKey: rootState.user.sessionKey })
            .then((response) => {
                console.log(response);
                resolve();
            })
            .catch((error) => {
                console.log(error);
                Notify.create({
                    message: `(╯°□°）╯︵ ┻━┻ ${error.toString()}`,
                    timeout: 2000,
                });
                reject();
            });
    });
}

export function deleteItemById({ commit, rootState }, { id }) {
    /*
    dataObj = {
        id: '',
    }
     */
    return new Promise((resolve, reject) => {
        commit('deleteItemById', { id });
        axiosInstance.post('/', { requestType: 'deleteItem', data: { itemId: id }, sessionKey: rootState.user.sessionKey })
            .then((response) => {
                console.log(response);
                resolve();
            })
            .catch((error) => {
                Notify.create({
                    message: `(╯°□°）╯︵ ┻━┻ ${error.toString()}`,
                    timeout: 2000,
                });
                console.log(error);
                reject();
            });
    });
}


export function setItemPropertiesById({ commit, rootState }, obj) {
    return new Promise((resolve, reject) => {
        if ('id' in obj) {
            commit('setItemPropertiesById', obj);
            axiosInstance.post('/', { requestType: 'modifyItem', itemId: obj.id, data: obj, sessionKey: rootState.user.sessionKey })
                .then((response) => {
                    console.log(response.data);
                    resolve();
                })
                .catch((err) => {
                    Notify.create({
                        message: `(╯°□°）╯︵ ┻━┻ ${err.toString()}`,
                        timeout: 2000,
                    });
                    console.log(err);
                    reject();
                });
            resolve();
        } else {
            reject();
        }
    });
}
