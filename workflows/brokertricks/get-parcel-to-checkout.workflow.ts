import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : get-parcel-to-checkout
// Nodes   : 4  |  Connections: 3
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// Webhook                            webhook
// RespondToWebhook                   respondToWebhook
// Cookie                             httpRequest
// GetParcel                          httpRequest                [executeOnce]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// Webhook
//    → Cookie
//      → GetParcel
//        → RespondToWebhook
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'DLyxGg3CIEt94Mf9',
    name: 'get-parcel-to-checkout',
    active: true,
    description:
        "This is part of the checkout flow. it gets the customers selected property's parcel number and returns it to the checkout form for confirmation.",
    isArchived: false,
    projectId: 'SxZfT7rxAv9cKdRm',
    settings: { executionOrder: 'v1', binaryMode: 'separate', availableInMCP: true },
})
export class GetParcelToCheckoutWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '2d4cf796-c8c3-4d05-9197-0836c9e21ee7',
        webhookId: 'db5ee619-c319-42f0-bbd7-d6050f5d2338',
        name: 'Webhook',
        type: 'n8n-nodes-base.webhook',
        version: 2.1,
        position: [0, 0],
    })
    Webhook = {
        path: 'get-parcel-to-checkout',
        responseMode: 'responseNode',
        options: {},
    };

    @node({
        id: 'bbd73648-abba-4cd7-955e-ac44f5f35391',
        name: 'Respond to Webhook',
        type: 'n8n-nodes-base.respondToWebhook',
        version: 1.4,
        position: [464, 0],
    })
    RespondToWebhook = {
        respondWith: 'redirect',
        redirectURL:
            "=https://brokertricks.com/checkout/?line_items[0][price_id]={{ $('Webhook').item.json.query.cf6ro4a2lm }}&line_items[0][quantity]=1&cf6ro4a2lm={{ $('Webhook').item.json.query.cf6ro4a2lm }}&latInput={{ $('Webhook').item.json.query.latInput }}&lngInput={{ $('Webhook').item.json.query.lngInput }}&submission_id={{ $('Webhook').item.json.query['submission-id'] }}&cfd3r3gjpt={{ $('Webhook').item.json.query.cfd3r3gjpt }}&cf6ro4a2lm={{ $('Webhook').item.json.query.cf6ro4a2lm }}&parcel={{ $json.parcelnumb }}",
        options: {
            responseCode: 303,
            responseHeaders: {
                entries: [
                    {
                        name: 'Cache-Control',
                        value: 'no-store, no-cache, must-revalidate, max-age=0',
                    },
                    {
                        name: 'Pragma',
                        value: 'no-cache',
                    },
                    {
                        name: 'Access-Control-Allow-Origin',
                        value: 'https://brokertricks.com',
                    },
                    {
                        name: 'Access-Control-Allow-Credentials',
                        value: 'true',
                    },
                    {
                        name: 'Access-Control-Allow-Methods',
                        value: 'POST, GET, OPTIONS',
                    },
                    {
                        name: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization',
                    },
                    {
                        name: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        name: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        name: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                ],
            },
        },
    };

    @node({
        id: 'e03a00ab-ebee-4c14-9275-f7b01b5eca89',
        name: 'cookie',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [112, 0],
    })
    Cookie = {
        url: 'https://auto.brokertricks.com/webhook/cookie',
        options: {},
    };

    @node({
        id: 'b5340db0-25be-4c56-bbf2-f556b9090fb7',
        name: 'get-parcel',
        type: 'n8n-nodes-base.httpRequest',
        version: 3,
        position: [224, 0],
        alwaysOutputData: false,
        executeOnce: true,
    })
    GetParcel = {
        url: 'https://app.regrid.com/search.json',
        sendQuery: true,
        queryParameters: {
            parameters: [
                {
                    name: 'query',
                    value: '={{ $json.query.latInput }},{{ $json.query.lngInput }}',
                },
                {
                    name: 'autocomplete',
                    value: '1',
                },
                {
                    name: 'context',
                    value: '/us',
                },
                {
                    name: 'strict',
                    value: 'false',
                },
            ],
        },
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'authority',
                    value: 'app.regrid.com',
                },
                {
                    name: 'accept',
                    value: 'application/json, text/javascript, */*; q=0.01',
                },
                {
                    name: 'accept-language',
                    value: 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
                },
                {
                    name: 'cache-control',
                    value: 'no-cache',
                },
                {
                    name: 'cookie',
                    value: "={{ $('cookie').item.json.cookie_header_string }}",
                },
                {
                    name: 'pragma',
                    value: 'no-cache',
                },
                {
                    name: 'referer',
                    value: 'https://app.regrid.com/us',
                },
                {
                    name: 'sec-ch-ua',
                    value: '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                },
                {
                    name: 'sec-ch-ua-mobile',
                    value: '?0',
                },
                {
                    name: 'sec-ch-ua-platform',
                    value: '"Windows"',
                },
                {
                    name: 'sec-fetch-dest',
                    value: 'empty',
                },
                {
                    name: 'sec-fetch-mode',
                    value: 'cors',
                },
                {
                    name: 'sec-fetch-site',
                    value: 'same-origin',
                },
                {
                    name: 'user-agent',
                    value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                },
                {
                    name: 'x-csrf-token',
                    value: '8nrHp/RiPDPJJEDnCWrNDe3OskdOjGAaeqWyZz3ZMTAvhtdKuk0pTO3e6zmGzzLLjYaBfwhXN+kgilsZ/dO/cQ==',
                },
                {
                    name: 'x-requested-with',
                    value: 'XMLHttpRequest',
                },
            ],
        },
        options: {
            batching: {
                batch: {
                    batchSize: 1,
                    batchInterval: 60000,
                },
            },
            redirect: {
                redirect: {},
            },
            response: {
                response: {
                    responseFormat: 'json',
                },
            },
        },
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.Webhook.out(0).to(this.Cookie.in(0));
        this.Cookie.out(0).to(this.GetParcel.in(0));
        this.GetParcel.out(0).to(this.RespondToWebhook.in(0));
    }
}
