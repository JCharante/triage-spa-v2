import { date } from 'quasar';
import { baseItem } from './def';

export function calculateDaysUntilRecommendedDeadline(obj) {
    const then = new Date(obj.recommendedDeadline);
    const now = new Date();
    const diff = date.getDateDiff(then, now, 'days');
    return diff;
}

export function calcDaysUntilHardDeadline(obj) {
    const then = new Date(obj.hardDeadline);
    const now = new Date();
    const diff = date.getDateDiff(then, now, 'days');
    return diff;
}

export function getItems(state) {
    return Object.values(state.items).map((item) => {
        let priorityPoints = 0;
        const now = new Date();
        let daysUntilRecommendedDeadline = 0;
        if (item.recommendedDeadline.length > 0) {
            daysUntilRecommendedDeadline = Math.floor((Date.parse(item.recommendedDeadline) - Date.now()) / 86400000);
        }

        let daysUntilHardDeadline = 0;
        if (item.hardDeadline.length > 0) {
            daysUntilHardDeadline = Math.floor((Date.parse(item.hardDeadline) - Date.now()) / 86400000);
        }

        let difficultyPoints = 1;
        if (item.difficulty === 'Easy') {
            difficultyPoints = 4;
        } else if (item.difficulty === 'Medium') {
            difficultyPoints = 3;
        } else if (item.difficulty === 'Hard') {
            difficultyPoints = 2;
        }

        let importancePoints = 1;
        if (item.importance === 'Low') {
            importancePoints = 2;
        } else if (item.importance === 'Medium') {
            importancePoints = 4;
        } else if (item.importance === 'High') {
            importancePoints = 8;
        } else if (item.importance === 'Mission Critical') {
            importancePoints = 12;
        }

        priorityPoints = difficultyPoints * importancePoints - (daysUntilRecommendedDeadline + daysUntilHardDeadline);

        return Object.assign({}, item, { priorityPoints });
    });
}

export function getItemById(state, getters) {
    // eslint-disable-next-line func-names
    return function (itemId) {
        const stored = getItems(state).filter(item => item.id === itemId)[0] || {};
        return Object.assign(baseItem(), {
            id: itemId,
        }, stored);
    };
}
