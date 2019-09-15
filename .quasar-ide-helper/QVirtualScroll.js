
/**
 * Quasar QVirtualScroll component
 * 
 * @see {@link https://v1.quasar-framework.org/vue-components/virtual-scroll|Quasar Docs} (Generated link, may not always work)
 */  
export default {
  name: 'QVirtualScroll',
  props: {
    /**
     * Emitted when the virtual scroll occurs
     * @param {{index : Number, from : Number, to : Number, direction : 'increase'|'decrease'}} details Object of properties on the new scroll position 
     */      
    '@virtual-scroll': function (details) {},
    /**
     * Make virtual list work in horizontal mode
     * @type {Boolean}
     */
    virtualScrollHorizontal: {
      type: Boolean,
    },
    /**
     * Number of options to render in the virtual list
     * @type {Number}
     */
    virtualScrollSliceSize: {
      type: Number,
    },
    /**
     * Default size in pixels (height if vertical, width if horizontal) of an option; This value is used for rendering the initial list; Try to use a value close to the minimum size of an item
     * @type {Number}
     */
    virtualScrollItemSize: {
      type: Number,
    },
    /**
     * Size in pixels (height if vertical, width if horizontal) of the sticky part (if using one) at the start of the list; A correct value will improve scroll precision
     * @type {Number}
     */
    virtualScrollStickySizeStart: {
      type: Number,
    },
    /**
     * Size in pixels (height if vertical, width if horizontal) of the sticky part (if using one) at the end of the list; A correct value will improve scroll precision
     * @type {Number}
     */
    virtualScrollStickySizeEnd: {
      type: Number,
    },
    /**
     * The type of content: list (default) or table
     * @type {'list'|'table'}
     */
    type: {
      type: String,
    },
    /**
     * The type of content: list (default) or table
     * @type {'list'|'table'}
     */
    'type="list"': {
      type: String,
    },
    /**
     * The type of content: list (default) or table
     * @type {'list'|'table'}
     */
    'type="table"': {
      type: String,
    },
    /**
     * Available list items that will be passed to the scoped slot; For best performance freeze the list of items; Required if 'itemsFn' is not supplied
     * @type {Array}
     */
    items: {
      type: Array,
    },
    /**
     * Number of available items in the list; Required and used only if 'itemsFn' is provided
     * @type {String|Number}
     */
    itemsSize: {
      type: [String,Number],
    },
    /**
     * Function to return the scope for the items to be displayed; Should return an array for items starting from 'from' index for size length
     * @type {Function}
     */
    itemsFn: {
      type: Function,
    },
    /**
     * CSS selector or DOM element to be used as scroll container instead of the component's own container
     * @type {Element|String}
     */
    scrollTarget: {
      type: [Element,String],
    }
  }
}
