'use strict';

/**
 * business-area service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::business-area.business-area');
