"use strict"

const { broker } = require("../Services/index");

const ListController = async (req, res) => {
    const ret = await broker.call("webhooks.list");
    res.json(ret);
};

const RegisterController = async (req, res) => {
    const { targetUrl } = req.body;
    const ret = await broker.call("webhooks.register", {targetUrl});
    res.json(ret);
};

const UpdateController = async (req, res) => {
    const { id, newTargetUrl } = req.body;
    const ret = await broker.call("webhooks.update", {id, newTargetUrl});
    res.json(ret);
};

const DeleteController = async (req, res) => {
    const { id } = req.body;
    const ret = await broker.call("webhooks.del", {id});
    res.json(ret);
};

const TriggerIPController = async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress ;
    const ret = await broker.call("webhooks.trigger", {ipAddress});
    res.json(ret);
};


module.exports = {
    ListController,
    RegisterController,
    UpdateController,
    DeleteController,
    TriggerIPController,
};