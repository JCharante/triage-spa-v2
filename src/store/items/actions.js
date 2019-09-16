import { baseItem } from './def';
import { axiosInstance } from '../../boot/axios';

const uuidv4 = require('uuid/v4');

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

export function createItem({ commit }, itemName) {
    return new Promise((resolve, reject) => {
        const data = Object.assign(baseItem(), {
            task: itemName,
            id: uuidv4(),
        });
        /*
        axiosInstance.post('/', { type: 'addItem', data })
            .then((response) => {
                console.log(response);
                commit('addItem', data);
                resolve();
            })
            .catch((err) => {
                console.log(err);
                reject();
            });
         */
        commit('addItem', data);
        resolve();
    });
}

export function deleteItemById({ commit }, dataObj) {
    /*
    dataObj = {
        id: '',
    }
     */
    return new Promise((resolve, reject) => {
        /*
        axiosInstance.post('/', { type: 'deleteItem', data: dataObj })
            .then((response) => {
                console.log(response);
                commit('deleteItemById', dataObj);
                resolve();
            })
            .catch((err) => {
                console.log(err);
                reject();
            });
         */
        commit('deleteItemById', dataObj);
        resolve();
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
