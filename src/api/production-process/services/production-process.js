'use strict';

/**
 * production-process service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::production-process.production-process');
