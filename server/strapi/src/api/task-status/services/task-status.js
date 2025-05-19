'use strict';

/**
 * task-status service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::task-status.task-status');
