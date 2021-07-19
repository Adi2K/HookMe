"use strict";

const { ServiceBroker } = require("moleculer");


const broker = new ServiceBroker();
broker.loadService("./Services/webhooks.service");

broker.start();

module.exports = { broker };
