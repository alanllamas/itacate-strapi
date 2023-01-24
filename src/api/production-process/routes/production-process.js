'use strict';

/**
 * production-process router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::production-process.production-process');
