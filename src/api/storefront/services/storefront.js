'use strict';

/**
 * storefront service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::storefront.storefront');
