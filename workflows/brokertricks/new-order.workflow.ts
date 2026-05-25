import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : new-order
// Nodes   : 19  |  Connections: 14
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// Webhook                            webhook
// StickyNote                         stickyNote
// HttpRequest                        httpRequest                [creds]
// Switch_                            switch
// HttpRequest1                       httpRequest
// HttpRequest3                       httpRequest                [creds]
// HttpRequest4                       httpRequest                [creds]
// GetManyUsers                       wordpress                  [creds]
// EditFields                         set
// GetCheckoutFields                  httpRequest                [creds]
// GeoToPath                          httpRequest                [alwaysOutput]
// PathToData                         httpRequest                [executeOnce]
// HttpRequest2                       httpRequest
// CallIdempotencyManage              executeWorkflow
// EditFields1                        set
// If_                                if
// NoOperationDoNothing               noOp
// IdempotencyCleanup                 executeWorkflow
// DataShaper                         set
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// Webhook
//    → EditFields1
//      → CallIdempotencyManage
//        → If_
//          → HttpRequest2
//            → GeoToPath
//              → PathToData
//                → GetCheckoutFields
//                  → GetManyUsers
//                    → EditFields
//                      → Switch_
//                       .out(2) → HttpRequest1
//                          → DataShaper
//                            → IdempotencyCleanup
//         .out(1) → NoOperationDoNothing
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'NxcEiPloqLn1EJ87',
    name: 'new-order',
    active: true,
    isArchived: false,
    projectId: 'SxZfT7rxAv9cKdRm',
    settings: {
        executionOrder: 'v1',
        callerPolicy: 'workflowsFromSameOwner',
        availableInMCP: false,
        binaryMode: 'separate',
    },
})
export class NewOrderWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '1202c937-1d99-481f-8e6a-2ce76e85e811',
        webhookId: '0ccdd082-8344-4377-9f4e-55d03d5029a0',
        name: 'Webhook',
        type: 'n8n-nodes-base.webhook',
        version: 2.1,
        position: [-2000, 480],
    })
    Webhook = {
        httpMethod: 'POST',
        path: 'new-order',
        responseMode: 'lastNode',
        options: {},
    };

    @node({
        id: '679fbb5a-5817-4b54-83f9-f5aaf9ef6ef4',
        name: 'Sticky Note',
        type: 'n8n-nodes-base.stickyNote',
        version: 1,
        position: [-304, -320],
    })
    StickyNote = {
        content: `## Product Id's
| Product | . | ID |
|---:|---|---|
| **Single Image** | .... | 69e6ffdb-d671-4309-a9d9-78fdef6d958a |
| **Single Full Story** | .... | 99a2075c-abd9-4b0d-b567-50467264151b |
| **Full Listing Kit** | .... | d082d9a3-90d3-41e3-8b6a-53e8b4572cf6 |


`,
        height: 224,
        width: 560,
        color: '#6AE651',
    };

    @node({
        id: 'eba2f073-aa12-407b-bb62-cbdb763e213c',
        name: 'HTTP Request',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [-2000, -80],
        credentials: { httpBearerAuth: { id: 'xhDXgP3FOrplGc9h', name: 'get product id' } },
    })
    HttpRequest = {
        url: '=https://api.surecart.com/v1/orders/{{ $json.body.data.object.id }}',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        options: {},
    };

    @node({
        id: 'e3f39d65-5172-4beb-80c0-92296ae8fb8a',
        name: 'Switch',
        type: 'n8n-nodes-base.switch',
        version: 3.3,
        position: [240, 368],
    })
    Switch_ = {
        rules: {
            values: [
                {
                    conditions: {
                        options: {
                            caseSensitive: true,
                            leftValue: '',
                            typeValidation: 'strict',
                            version: 2,
                        },
                        conditions: [
                            {
                                leftValue: '={{ $json.pid }}',
                                rightValue: ' bb3c33ae-36bc-488d-809e-166665ad7fe6',
                                operator: {
                                    type: 'string',
                                    operation: 'equals',
                                },
                                id: '656adc4d-1f78-4445-bebe-b6cd65b2b531',
                            },
                        ],
                        combinator: 'and',
                    },
                    renameOutput: true,
                    outputKey: 'single image',
                },
                {
                    conditions: {
                        options: {
                            caseSensitive: true,
                            leftValue: '',
                            typeValidation: 'strict',
                            version: 2,
                        },
                        conditions: [
                            {
                                id: 'a7615221-b164-40cb-9df2-0540db1fdc75',
                                leftValue: '={{ $json.pid }}',
                                rightValue: '69e6ffdb-d671-4309-a9d9-78fdef6d958a',
                                operator: {
                                    type: 'string',
                                    operation: 'equals',
                                    name: 'filter.operator.equals',
                                },
                            },
                        ],
                        combinator: 'and',
                    },
                    renameOutput: true,
                    outputKey: 'single full',
                },
                {
                    conditions: {
                        options: {
                            caseSensitive: true,
                            leftValue: '',
                            typeValidation: 'strict',
                            version: 2,
                        },
                        conditions: [
                            {
                                id: '6911a445-1c99-401e-9e79-121a5226a192',
                                leftValue: '={{ $json.pid }}',
                                rightValue: 'd082d9a3-90d3-41e3-8b6a-53e8b4572cf6',
                                operator: {
                                    type: 'string',
                                    operation: 'equals',
                                },
                            },
                        ],
                        combinator: 'and',
                    },
                    renameOutput: true,
                    outputKey: 'listing pack',
                },
            ],
        },
        options: {},
    };

    @node({
        id: 'bb06c8b8-cd67-4b91-b3b2-12ebf8e75ea3',
        name: 'HTTP Request1',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [512, 512],
    })
    HttpRequest1 = {
        url: 'https://auto.brokertricks.com/webhook/full',
        sendBody: true,
        bodyParameters: {
            parameters: [
                {
                    name: 'payload',
                    value: '={{$json}}',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '3e1b5f18-b96d-4807-ac9a-984acea5dba3',
        name: 'HTTP Request3',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [-2000, 144],
        credentials: { httpBearerAuth: { id: 'fs3UN7UYgrHE4ads', name: 'surecart' } },
    })
    HttpRequest3 = {
        url: '=https://api.surecart.com/v1/customers/{{ $json.checkout.customer.id }}',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        sendQuery: true,
        queryParameters: {
            parameters: [
                {
                    name: 'expand[]',
                    value: 'customer',
                },
            ],
        },
        sendBody: true,
        bodyParameters: {
            parameters: [
                {
                    name: 'expand[]',
                    value: 'customer',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '6bda556d-3d33-4e87-ae3d-f0a1f3a1ab74',
        name: 'HTTP Request4',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [-2000, -304],
        credentials: { httpBearerAuth: { id: 'fs3UN7UYgrHE4ads', name: 'surecart' } },
    })
    HttpRequest4 = {
        url: "=https://api.surecart.com/v1/orders/{{ $('Webhook').item.json.body.data.object.id }}",
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        sendBody: true,
        contentType: 'multipart-form-data',
        bodyParameters: {
            parameters: [
                {
                    name: 'expand[]',
                    value: 'checkout',
                },
                {
                    name: 'expand[]',
                    value: 'checkout.customer',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '5abad326-5355-45b6-a1c8-699d9ddcbc0f',
        name: 'Get many users',
        type: 'n8n-nodes-base.wordpress',
        version: 1,
        position: [-208, 384],
        credentials: { wordpressApi: { id: 'LARssrhxqUVVlkOR', name: 'get wp user' } },
    })
    GetManyUsers = {
        resource: 'user',
        operation: 'getAll',
        limit: 1,
        options: {
            search: '={{ $json.email }}',
        },
    };

    @node({
        id: '273feb1e-dbda-45dc-b00a-5855ec15cfba',
        name: 'Edit Fields',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [16, 384],
    })
    EditFields = {
        assignments: {
            assignments: [
                {
                    id: '15cf273e-062c-4a60-954c-e6939f943165',
                    name: 'wpuser_id',
                    value: '={{ $json.id }}',
                    type: 'string',
                },
                {
                    id: 'f94a3ebb-b2ba-4cf4-8af1-fa68159a59de',
                    name: 'email',
                    value: '={{ $json.name }}',
                    type: 'string',
                },
                {
                    id: 'bb94a86b-3f59-4497-b3ea-4a838a74da70',
                    name: 'order_id',
                    value: "={{ $('get checkout fields').item.json.id }}",
                    type: 'string',
                },
                {
                    id: '4eea76de-1667-4d71-b2ed-314447def552',
                    name: 'parcel_apn',
                    value: "={{ $('get checkout fields').item.json.metadata.parcel }}",
                    type: 'string',
                },
                {
                    id: '3cf83781-91f3-45f3-bb43-ab1eb238e897',
                    name: 'latitude',
                    value: "={{ $('get checkout fields').item.json.metadata.latInput }}",
                    type: 'string',
                },
                {
                    id: '90ebb0c0-4ba3-4485-af09-d420f3369432',
                    name: 'longitude',
                    value: "={{ $('get checkout fields').item.json.metadata.lngInput }}",
                    type: 'string',
                },
                {
                    id: 'fba4c275-11bf-4e36-9c25-576919a93f93',
                    name: 'price_id',
                    value: "={{ $('get checkout fields').item.json.metadata.price_id }}",
                    type: 'string',
                },
                {
                    id: '896fda72-a501-4bbb-a589-a185166ca94e',
                    name: 'pid',
                    value: "={{ $('get checkout fields').item.json.metadata.pid }}",
                    type: 'string',
                },
                {
                    id: '86ea7d82-4ead-42b8-b1d7-aa0c1b675886',
                    name: 'submission_id',
                    value: "={{ $('get checkout fields').item.json.metadata.submission_id }}",
                    type: 'string',
                },
                {
                    id: 'd67fcdc0-bf1f-4263-bf7b-c708de7d6d7d',
                    name: 'geometry',
                    value: "={{ $('path-to-data').item.json.geometry }}",
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '3ada87a2-aa8d-454f-baf6-d0ad9e957426',
        name: 'get checkout fields',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.4,
        position: [-432, 384],
        credentials: { httpHeaderAuth: { id: 'WqEyKDhHJUyfY0Iz', name: 'surecart' } },
    })
    GetCheckoutFields = {
        url: "=https://api.surecart.com/v1/checkouts/{{ $('Webhook').item.body.data.object.checkout }}",
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        options: {},
    };

    @node({
        id: '9c336703-6cb4-4a8a-931d-60c744552ec4',
        name: 'geo-to-path',
        type: 'n8n-nodes-base.httpRequest',
        version: 3,
        position: [-880, 384],
        alwaysOutputData: true,
    })
    GeoToPath = {
        url: 'https://app.regrid.com/search.json',
        sendQuery: true,
        queryParameters: {
            parameters: [
                {
                    name: 'query',
                    value: '={{ $json.query.lat }},{{ $json.query.lon }}',
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
                    value: '_gcl_au=1.1.1041038130.1678305427; _ga=GA1.2.425307303.1678305428; _CEFT=Q%3D%3D%3D; hubspotutk=97436c6f20b31d9d5a38bcbbd4b34565; intercom-id-iumjbczf=2369487d-fd89-4379-9bd2-df92d17df46d; intercom-device-id-iumjbczf=d3d2e856-aedc-403d-a715-e2cacd12df64; track_uid=b64d1395-2a0f-6081-4909-3a07e3332a3b; intercom-session-iumjbczf=; _gid=GA1.2.1545326082.1680109359; _ce.clock_event=1; _ce.clock_data=140%2C69.59.65.170%2C1; _session_id=f159321d9db3ee3011a173b937b200c8; ln_or=eyIzMzIwMTE0IjoiZCJ9; __cf_bm=dfHa3SCbNel_nfPhCfddTzKnznx_VYiJz0sbbVMQP7w-1680119487-0-AQW9AHq+rJDwDRzEvyLgRyFJYaTz8LUR5C64Suvfv2hgeq53OzWjjGHwm5ATVchgL1nyny2e8n9pMSMjM217i5Q=; __cfruid=4abc0d8245a719c187ab6177233e5a4c78e819ea-1680119487; _gat=1; cebs=1; _ce.s=v~1b617d7c18b746e142f13287416da35de42d270a~vpv~3~v11.rlc~1680119488158; __hstc=243024157.97436c6f20b31d9d5a38bcbbd4b34565.1678305427889.1680109360034.1680119488393.4; __hssrc=1; __hssc=243024157.1.1680119488393; _uetsid=830ddab0ce5311eda6855dfc8a45805c; _uetvid=fedb2f00346911edacc8e1fe01936b93; cebsp_=4',
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
        options: {},
    };

    @node({
        id: 'ba68cdaf-96af-4117-b38f-286fbb6b120e',
        name: 'path-to-data',
        type: 'n8n-nodes-base.httpRequest',
        version: 3,
        position: [-656, 384],
        executeOnce: true,
    })
    PathToData = {
        url: '=https://app.regrid.com{{ $json.path }}.json',
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'authority',
                    value: 'app.regrid.com',
                },
                {
                    name: 'accept',
                    value: '*/*',
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
                    value: '_gcl_au=1.1.1041038130.1678305427; _ga=GA1.2.425307303.1678305428; _CEFT=Q%3D%3D%3D; hubspotutk=97436c6f20b31d9d5a38bcbbd4b34565; intercom-id-iumjbczf=2369487d-fd89-4379-9bd2-df92d17df46d; intercom-device-id-iumjbczf=d3d2e856-aedc-403d-a715-e2cacd12df64; track_uid=b64d1395-2a0f-6081-4909-3a07e3332a3b; intercom-session-iumjbczf=; _gid=GA1.2.1545326082.1680109359; _ce.clock_event=1; _ce.clock_data=140%2C69.59.65.170%2C1; _session_id=f159321d9db3ee3011a173b937b200c8; ln_or=eyIzMzIwMTE0IjoiZCJ9; __cf_bm=dfHa3SCbNel_nfPhCfddTzKnznx_VYiJz0sbbVMQP7w-1680119487-0-AQW9AHq+rJDwDRzEvyLgRyFJYaTz8LUR5C64Suvfv2hgeq53OzWjjGHwm5ATVchgL1nyny2e8n9pMSMjM217i5Q=; __cfruid=4abc0d8245a719c187ab6177233e5a4c78e819ea-1680119487; cebs=1; _ce.s=v~1b617d7c18b746e142f13287416da35de42d270a~vpv~3~v11.rlc~1680119488158; __hstc=243024157.97436c6f20b31d9d5a38bcbbd4b34565.1678305427889.1680109360034.1680119488393.4; __hssrc=1; __hssc=243024157.1.1680119488393; _uetsid=830ddab0ce5311eda6855dfc8a45805c; _uetvid=fedb2f00346911edacc8e1fe01936b93; cebsp_=4; _gat=1',
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
            response: {
                response: {},
            },
        },
    };

    @node({
        id: 'e03a00ab-ebee-4c14-9275-f7b01b5eca89',
        name: 'HTTP Request2',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [-1104, 384],
    })
    HttpRequest2 = {
        url: 'https://auto.brokertricks.com/webhook/cookie',
        options: {},
    };

    @node({
        id: 'f319373e-f381-415d-88a7-041e547d56b7',
        name: "Call 'Idempotency Manage'",
        type: 'n8n-nodes-base.executeWorkflow',
        version: 1.3,
        position: [-1552, 480],
    })
    CallIdempotencyManage = {
        workflowId: {
            __rl: true,
            value: 'Siddcwr4PORBPgdL',
            mode: 'list',
            cachedResultUrl: '/workflow/Siddcwr4PORBPgdL',
            cachedResultName: 'Idempotency Manage',
        },
        workflowInputs: {
            mappingMode: 'defineBelow',
            value: {},
            matchingColumns: [],
            schema: [],
            attemptToConvertTypes: false,
            convertFieldsToString: true,
        },
        options: {
            waitForSubWorkflow: true,
        },
    };

    @node({
        id: 'e5cbd0f6-28c6-4782-9043-57a162ee7f38',
        name: 'Edit Fields1',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-1776, 480],
    })
    EditFields1 = {
        assignments: {
            assignments: [
                {
                    id: 'bc2c84f2-6bcf-45e0-a498-bb2283130210',
                    name: 'action',
                    value: 'check',
                    type: 'string',
                },
                {
                    id: '3b3aa281-79fd-4eb1-8236-63506814ae71',
                    name: 'idempotency_key',
                    value: '={{ $json.body.order_id }}',
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '643fd973-9244-448e-a77b-49f68b468179',
        name: 'If',
        type: 'n8n-nodes-base.if',
        version: 2.3,
        position: [-1328, 480],
    })
    If_ = {
        conditions: {
            options: {
                caseSensitive: true,
                leftValue: '',
                typeValidation: 'strict',
                version: 3,
            },
            conditions: [
                {
                    id: '4b844a94-91a5-4076-8446-933c4a399a9b',
                    leftValue: '={{ $json.is_duplicate }}',
                    rightValue: '',
                    operator: {
                        type: 'boolean',
                        operation: 'false',
                        singleValue: true,
                    },
                },
            ],
            combinator: 'and',
        },
        options: {},
    };

    @node({
        id: 'ab0b06a5-3238-4c4c-a72a-8c78fc0030b9',
        name: 'No Operation, do nothing',
        type: 'n8n-nodes-base.noOp',
        version: 1,
        position: [-1104, 576],
    })
    NoOperationDoNothing = {};

    @node({
        id: '4e4c61cf-cc73-4d08-b3fa-ca90641bf290',
        name: 'Idempotency Cleanup',
        type: 'n8n-nodes-base.executeWorkflow',
        version: 1.3,
        position: [960, 384],
    })
    IdempotencyCleanup = {
        workflowId: {
            __rl: true,
            value: 'Siddcwr4PORBPgdL',
            mode: 'list',
            cachedResultUrl: '/workflow/Siddcwr4PORBPgdL',
            cachedResultName: 'Idempotency Manage',
        },
        workflowInputs: {
            mappingMode: 'defineBelow',
            value: {},
            matchingColumns: [],
            schema: [],
            attemptToConvertTypes: false,
            convertFieldsToString: true,
        },
        options: {
            waitForSubWorkflow: true,
        },
    };

    @node({
        id: '24fbe0b7-3bfd-4aa3-9fa2-6abe1feafd37',
        name: 'data shaper',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [752, 400],
    })
    DataShaper = {
        assignments: {
            assignments: [
                {
                    id: 'f44f2acb-6b81-49a8-82a4-211ca57fbe95',
                    name: 'action',
                    value: 'complete',
                    type: 'string',
                },
                {
                    id: '4992e8ce-dc02-4800-96eb-49717f1bcc03',
                    name: 'idempotency_key',
                    value: "={{ $('Webhook').item.json.body.order_id }}",
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.Webhook.out(0).to(this.EditFields1.in(0));
        this.Switch_.out(2).to(this.HttpRequest1.in(0));
        this.GetManyUsers.out(0).to(this.EditFields.in(0));
        this.EditFields.out(0).to(this.Switch_.in(0));
        this.GetCheckoutFields.out(0).to(this.GetManyUsers.in(0));
        this.GeoToPath.out(0).to(this.PathToData.in(0));
        this.HttpRequest2.out(0).to(this.GeoToPath.in(0));
        this.PathToData.out(0).to(this.GetCheckoutFields.in(0));
        this.CallIdempotencyManage.out(0).to(this.If_.in(0));
        this.EditFields1.out(0).to(this.CallIdempotencyManage.in(0));
        this.If_.out(0).to(this.HttpRequest2.in(0));
        this.If_.out(1).to(this.NoOperationDoNothing.in(0));
        this.HttpRequest1.out(0).to(this.DataShaper.in(0));
        this.DataShaper.out(0).to(this.IdempotencyCleanup.in(0));
    }
}
