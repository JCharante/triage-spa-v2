import Vue from 'vue'

/*
 * @param {Boolean|Number|String} If value is 0 or 'false' then directive is disabled; if value is < 0 then it closes all popups in the chain; if value is 1 or 'true' or undefined then it closes only the parent popup; if value is > 1 it closes the specified number of parent popups in the chain (note that chained QMenus are considered 1 popup only & QPopupProxy separates chained menus)
 */
Vue.directive('ClosePopup', {})

/*
 * @param {String|Object} Equivalent to Vue Router <router-link> 'to' property
 */
Vue.directive('GoBack', {})

/*
 * @param {Boolean|{stop : Boolean, center : Boolean, color : String}} Boolean (if just wanting to enable/disable) or Object for configuring more options
 */
Vue.directive('Ripple', {})

/*
 * @param {Function} Function to call when scrolling occurs
 */
Vue.directive('Scroll', {})

/*
 * @param {Function} Function to call when scrolling occurs
 */
Vue.directive('Scroll="(verticalscrollposition, horizontalscrollposition) => {}"', {})

/*
 * @param {Function} Function to call when scrolling and element comes into the viewport
 */
Vue.directive('ScrollFire', {})

/*
 * @param {Function} Function to call when scrolling and element comes into the viewport
 */
Vue.directive('ScrollFire="(el) => {}"', {})

/*
 * @param {Function} Function to call after user has hold touch/click for the specified amount of time
 */
Vue.directive('TouchHold', {})

/*
 * @param {Function} Function to call after user has hold touch/click for the specified amount of time
 */
Vue.directive('TouchHold="(details) => {}"', {})

/*
 * @param {Function} Handler for panning
 */
Vue.directive('TouchPan', {})

/*
 * @param {Function} Handler for panning
 */
Vue.directive('TouchPan="(details) => {}"', {})

/*
 * @param {Function} Handler for touch-repeat
 */
Vue.directive('TouchRepeat', {})

/*
 * @param {Function} Handler for touch-repeat
 */
Vue.directive('TouchRepeat="(details) => {}"', {})

/*
 * @param {Function} Handler for swipe
 */
Vue.directive('TouchSwipe', {})

/*
 * @param {Function} Handler for swipe
 */
Vue.directive('TouchSwipe="(details) => {}"', {})
