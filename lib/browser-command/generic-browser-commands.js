'use strict';

/**
 * @module browser-command/generic-browser-commands
 * @desc Defines custom browser commands that are made available through the global WebdriverIO browser object.
 */
const genericBrowserCommands = {

  /**
   * @function waitForVisible
   * @desc waitForVisible on multiple elements
   * @since 1.0.0
   * @param {string[]} elements - Array of elements that are CSS selectors
   * @returns {Promise}
   */
  waitForAllVisible(elements) {
    const promises = [];

    for (const i in elements) {
      if (elements.hasOwnProperty(i)) {
        promises.push(browser.waitForVisible(elements[i]));
      }
    }

    return Promise.all(promises);
  },

  /**
   * @function getNumberOfElements
   * @desc Get the number of elements matching a specific CSS selector
   * @since 1.0.0
   * @param {string} selector - CSS selector to identify the elements
   * @returns {Promise}
   */
  getNumberOfElements(selector) {
    return browser
      .elements(selector)
      .then(elements => Promise.resolve(elements.value.length));
  },

  /**
   * @function clickNthElement
   * @desc Click on the nth element of the list of elements matching the CSS selector
   * @since 1.0.0
   * @param {string} selector - CSS selector to identify the elements
   * @param {number} nth - Element to click on. First element is at rank 1.
   * @returns {Promise}
   */
  clickNthElement(selector, nth) {
    return browser
      .elements(selector)
      .then(elements => browser.elementIdClick(elements.value[nth - 1].ELEMENT));
  },

  /**
   * @function clickFirstElement
   * @desc Click on the first element of the list of elements matching the CSS selector
   * @since 1.0.0
   * @param {string} selector - CSS selector to identify the elements
   * @returns {Promise}
   */
  clickFirstElement(selector) {
    return browser
      .elements(selector)
      .then(elements => browser.elementIdClick(elements.value[0].ELEMENT));
  },

  /**
   * @function clickLastElement
   * @desc Click on the last element of the list of elements matching the CSS selector
   * @since 1.0.0
   * @param {string} selector - CSS selector to identify the elements
   * @returns {Promise}
   */
  clickLastElement(selector) {
    return browser
      .elements(selector)
      .then(elements => browser.elementIdClick(elements.value[elements.value.length - 1].ELEMENT));
  },

  /**
   * @desc Scroll vertically and horizontally from the element position before clicking.
   * It can be used for instance when there is a floating object that hides a button to click on. A scroll would allow to make the button
   * move out of the floating object and thus be clickable.
   * @since 1.1.0
   * @param {string} selector CSS selector to match
   * @param {int} hOffset Offset for the horizontal scroll
   * @param {int} vOffset Offset for the vertical scroll
   * @param {int} [pause = 200] Pause in ms after scrolling (for the floating element to disappear for instance)
   */
  scrollAndClick(selector, hOffset, vOffset, pause = 200) {
    return browser
      .scroll(selector, hOffset, vOffset)
      .pause(pause)
      .element(selector)
      .then(elementId => browser.elementIdClick(elementId.value.ELEMENT));
  },

};

/**
 * @alias genericBrowserCommand.waitForAllVisible
 * @memberOf browser
 * @method waitForAllVisible
 */
browser.addCommand(
  'waitForAllVisible',
  function (elements) {
    return genericBrowserCommands.waitForAllVisible(elements);
  }
);

/**
 * @alias genericBrowserCommand.getNumberOfElements
 * @memberOf browser
 * @method getNumberOfElements
 */
browser.addCommand(
  'getNumberOfElements',
  function (selector) {
    return genericBrowserCommands.getNumberOfElements(selector);
  }
);

/**
 * @alias genericBrowserCommand.clickNthElement
 * @memberOf browser
 * @method clickNthElement
 */
browser.addCommand(
  'clickNthElement',
  function (selector, nth) {
    return genericBrowserCommands.clickNthElement(selector, nth);
  }
);

/**
 * @alias genericBrowserCommand.clickFirstElement
 * @memberOf browser
 * @method clickFirstElement
 */
browser.addCommand(
  'clickFirstElement',
  function (selector) {
    return genericBrowserCommands.clickFirstElement(selector);
  }
);

/**
 * @alias genericBrowserCommand.clickLastElement
 * @memberOf browser
 * @method clickLastElement
 */
browser.addCommand(
  'clickLastElement',
  function (selector) {
    return genericBrowserCommands.clickLastElement(selector);
  }
);

/**
 * @alias genericBrowserCommand.scrollAndClick
 * @memberOf browser
 * @method scrollAndClick
 */
browser.addCommand(
  'scrollAndClick',
  function (selector, hOffset, vOffset, pause) {
    return genericBrowserCommands.scrollAndClick(selector, hOffset, vOffset, pause);
  }
);

module.exports = genericBrowserCommands;
