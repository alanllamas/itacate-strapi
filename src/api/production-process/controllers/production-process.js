'use strict';

/**
 * production-process controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::production-process.production-process');
