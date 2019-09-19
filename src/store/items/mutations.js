import Vue from 'vue';

export function addItem(state, itemObj) {
    Vue.set(state.items, itemObj.id, itemObj);
}

export function deleteItemById(state, { id }) {
    Vue.delete(state.items, id);
}

export function setItemPropertiesById(state, newItemObj) {
    state.items[newItemObj.id] = Object.assign({}, state.items[newItemObj.id], newItemObj);
}
