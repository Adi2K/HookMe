const Webhook = require("../models/WebhookModel");
const axios = require('axios');
const BATCH_SIZE = 10;

//Clean up the webhooks
//TODO: Add Error Handelling for webhooks


module.exports = {
    name: "webhooks",
    actions: {

        register: {
            cache: false,
            params: {
                targetUrl: "string"
            },
            async handler(ctx) {
                if (!ctx.action.cache)
                {
                    const newWebhook =  new Webhook(
                    {
                        targetURL: ctx.params.targetUrl
                    });
                    const ret = await newWebhook.save();
                    return (ret);
                }
                   
            }
        },

        update: {
            cache: false,
            params: {
                id: "string",
                newTargetUrl: "string"
            },
            async handler(ctx) {
                if (!ctx.action.cache)
                {
                    const ret = await Webhook.findByIdAndUpdate(ctx.params.id, 
                        {
                            targetURL: ctx.params.newTargetUrl
                        },
                        {
                            new: true, useFindAndModify: false
                        }
                        );
                    return (ret);
                }
                    
            }
        },



        del: {
            cache: false,
            params: {
                id: "string"
            },
            async handler(ctx) {
                if (!ctx.action.cache)
                {
                    const ret = await Webhook.findByIdAndDelete(ctx.params.id);
                    return (ret);
                }
            }
        },


        list: {
            cache: false,
            async handler(ctx) {
                if (!ctx.action.cache)
                {
                    const ret = await Webhook.find({});
                    return (ret);
                }
            }
        },

        trigger: {
            cache: false,
            params: {
                ipAddress: "string"
            },
            async handler(ctx) {
                if (!ctx.action.cache)
                {
                    const allWebhooks = await Webhook.find();

                    while (allWebhooks.length != 0)
                    {
                        let curr_batch = 0
                        let batch = []
                        var all_responses = []
                        let timestamp = Date.now()
                        while (allWebhooks.length != 0 && curr_batch < BATCH_SIZE)
                        {
                            let webH = allWebhooks.pop()
                            let req = axios.post(webH.targetURL, 
                            {
                                "ipAddress": ctx.params.ipAddress,
                                "timestamp": timestamp
                            });
                            batch.push(req);
                            curr_batch++;
                        }   

                        await axios.all(batch).then(axios.spread((...responses) => 
                        {
                            all_responses.push(responses);
                        }))
                        .catch(errors => 
                        {
                            console.log(errors);
                        })
                    }
                    return ("All Sent");
                }
            }
        },
    }
};



