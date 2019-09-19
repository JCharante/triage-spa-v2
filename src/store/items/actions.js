import { baseItem } from './def';
import { axiosInstance } from '../../boot/axios';

function mongoObjectId() {
    // eslint-disable-next-line no-bitwise
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
        // eslint-disable-next-line no-bitwise
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
}

export function initializeStoreFromServer({ commit }) {
    return new Promise((resolve, reject) => {
        axiosInstance.post('/', { type: 'getData' })
            .then((response) => {
                console.log(response);
                Object.values(response.data.itemsStore).forEach((item) => {
                    commit('addItem', item);
                });
                resolve();
            })
            .catch((err) => {
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
                // TODO: Toast
                console.log(error);
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
                // TODO: Toast
                console.log(error);
                reject();
            });
    });
}


export function setItemPropertiesById({ commit }, obj) {
    return new Promise((resolve, reject) => {
        if ('id' in obj) {
            /*
            axiosInstance.post('/', { type: 'modifyItem', data: obj })
                .then((response) => {
                    console.log(response.data);
                    obj.priorityPoints = response.data.priorityPoints;
                    commit('setItemPropertiesById', obj);
                    resolve();
                })
                .catch((err) => {
                    console.log(err);
                    reject();
                });
            */
            commit('setItemPropertiesById', obj);
            resolve();
        } else {
            reject();
        }
    });
}
