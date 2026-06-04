import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : new-order
// Nodes   : 36  |  Connections: 24
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// Webhook                            webhook
// StickyNote                         stickyNote
// HttpRequest                        httpRequest                [creds]
// Switch_                            switch
// HttpRequest3                       httpRequest                [creds]
// HttpRequest4                       httpRequest                [creds]
// EditFields                         set
// GeoToPath                          httpRequest                [alwaysOutput]
// PathToData                         httpRequest                [executeOnce]
// If_                                if
// NoOperationDoNothing               noOp
// IdempotencyCleanup                 executeWorkflow
// DataShaper                         set
// StickyNote1                        stickyNote
// StickyNote2                        stickyNote
// IdempotencyCleanup1                executeWorkflow
// DataShaper1                        set
// IdempotencyCleanup2                executeWorkflow
// DataShaper2                        set
// StickyNote3                        stickyNote
// StickyNote4                        stickyNote
// CallOverheadWorkflow               executeWorkflow
// CallSingleWorkflow                 executeWorkflow
// CallFullWorkflow                   executeWorkflow
// StickyNote5                        stickyNote
// Cookie                             httpRequest
// CreateKml                          code
// GetCheckout                        httpRequest                [creds]
// StaticMapUrlBuilder                set
// GeometryToStaticMapUrlPath         code
// GetUser                            wordpress                  [creds]
// SetIdempotencyKey                  set
// IdempotencyCheck                   executeWorkflow
// Wait                               wait
// CodeInJavascript                   code
// UploadAFile                        s3                         [creds]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// Webhook
//    → GetCheckout
//      → SetIdempotencyKey
//        → IdempotencyCheck
//          → If_
//            → Cookie
//              → GeoToPath
//                → PathToData
//                  → CreateKml
//                    → GeometryToStaticMapUrlPath
//                      → StaticMapUrlBuilder
//                        → GetUser
//                          → EditFields
//                            → Switch_
//                              → CallOverheadWorkflow
//                                → Wait
//                                  → CodeInJavascript
//                                    → UploadAFile
//                                      → DataShaper
//                                        → IdempotencyCleanup
//                             .out(1) → CallSingleWorkflow
//                                → Wait (↩ loop)
//                             .out(2) → CallFullWorkflow
//                                → Wait (↩ loop)
//           .out(1) → NoOperationDoNothing
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'NxcEiPloqLn1EJ87',
    name: 'new-order',
    active: true,
    isArchived: false,
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
        position: [-2160, 656],
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
        position: [-224, 752],
    })
    StickyNote = {
        content: `# 💡
| Product Type |  | Unique ID (UUID) |
| :--- | :--- | :--- |
| Single Image |  | 69e6ffdb-d671-4309-a9d9-78fdef6d958a |
| Single Full Story |  | 99a2075c-abd9-4b0d-b567-50467264151b |
| Full Listing Kit |  | d082d9a3-90d3-41e3-8b6a-53e8b4572cf6 |
`,
        width: 512,
        color: '#D9D9D9',
    };

    @node({
        id: 'eba2f073-aa12-407b-bb62-cbdb763e213c',
        name: 'HTTP Request',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [-2160, -80],
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
        position: [752, 544],
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
                                leftValue: "={{ $('set idempotency key').item.json.pid }}",
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
        id: '3e1b5f18-b96d-4807-ac9a-984acea5dba3',
        name: 'HTTP Request3',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [-2160, 144],
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
        position: [-2160, -304],
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
        id: '273feb1e-dbda-45dc-b00a-5855ec15cfba',
        name: 'Edit Fields',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [528, 560],
    })
    EditFields = {
        assignments: {
            assignments: [
                {
                    id: '15cf273e-062c-4a60-954c-e6939f943165',
                    name: 'wpuser_id',
                    value: "={{ $('get user').item.json.id }}",
                    type: 'string',
                },
                {
                    id: 'f94a3ebb-b2ba-4cf4-8af1-fa68159a59de',
                    name: 'email',
                    value: "={{ $('get user').item.json.name }}",
                    type: 'string',
                },
                {
                    id: 'bb94a86b-3f59-4497-b3ea-4a838a74da70',
                    name: 'order_id',
                    value: "={{ $('get checkout').item.json.id }}",
                    type: 'string',
                },
                {
                    id: '4eea76de-1667-4d71-b2ed-314447def552',
                    name: 'parcel_apn',
                    value: "={{ $('get checkout').item.json.metadata.parcel }}",
                    type: 'string',
                },
                {
                    id: '3cf83781-91f3-45f3-bb43-ab1eb238e897',
                    name: 'latitude',
                    value: "={{ $('get checkout').item.json.metadata.latInput }}",
                    type: 'string',
                },
                {
                    id: '90ebb0c0-4ba3-4485-af09-d420f3369432',
                    name: 'longitude',
                    value: "={{ $('get checkout').item.json.metadata.lngInput }}",
                    type: 'string',
                },
                {
                    id: 'fba4c275-11bf-4e36-9c25-576919a93f93',
                    name: 'price_id',
                    value: "={{ $('get checkout').item.json.metadata.price_id }}",
                    type: 'string',
                },
                {
                    id: '896fda72-a501-4bbb-a589-a185166ca94e',
                    name: 'pid',
                    value: "={{ $('get checkout').item.json.metadata.pid }}",
                    type: 'string',
                },
                {
                    id: '86ea7d82-4ead-42b8-b1d7-aa0c1b675886',
                    name: 'submission_id',
                    value: "={{ $('get checkout').item.json.metadata.submission_id }}",
                    type: 'string',
                },
                {
                    id: 'd67fcdc0-bf1f-4263-bf7b-c708de7d6d7d',
                    name: 'geometry',
                    value: "={{ $('path-to-data').item.json.geometry }}",
                    type: 'string',
                },
                {
                    id: '6019d5a9-03d1-4134-8431-ace28ad498a4',
                    name: 'cookie',
                    value: "={{ $('cookie').item.json.cookie_header_string }}",
                    type: 'string',
                },
                {
                    id: '85f8ea55-1fce-4789-bbc3-cd510e1e7ea8',
                    name: 'kml',
                    value: "={{ $('create-kml').item.json.kml }}",
                    type: 'string',
                },
                {
                    id: '1e9213c8-3c57-463b-97cf-db91346ca77b',
                    name: 'centroid',
                    value: "={{ $('path-to-data').item.json.centroid[0] }},{{ $('path-to-data').item.json.centroid[1] }}",
                    type: 'string',
                },
                {
                    id: '6651438a-171c-411b-a3be-76ee27571025',
                    name: 'county',
                    value: "={{ $('path-to-data').item.json.fields.county }}",
                    type: 'string',
                },
                {
                    id: '5b9c12f2-9222-47ae-aa4e-f97f45d4a06b',
                    name: 'acres',
                    value: "={{ $('static map url builder').item.json.acres }}",
                    type: 'string',
                },
                {
                    id: 'fb85059c-4519-4347-a328-17bc3129d5ee',
                    name: 'customer',
                    value: "={{ $('get checkout').item.json.customer }}",
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '9c336703-6cb4-4a8a-931d-60c744552ec4',
        name: 'geo-to-path',
        type: 'n8n-nodes-base.httpRequest',
        version: 3,
        position: [-816, 560],
        alwaysOutputData: true,
    })
    GeoToPath = {
        url: 'https://app.regrid.com/search.json',
        sendQuery: true,
        queryParameters: {
            parameters: [
                {
                    name: 'query',
                    value: "={{ $('get checkout').item.json.metadata.latInput }}, {{ $('get checkout').item.json.metadata.lngInput }}",
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
        options: {},
    };

    @node({
        id: 'ba68cdaf-96af-4117-b38f-286fbb6b120e',
        name: 'path-to-data',
        type: 'n8n-nodes-base.httpRequest',
        version: 3,
        position: [-608, 560],
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
            response: {
                response: {},
            },
        },
    };

    @node({
        id: '643fd973-9244-448e-a77b-49f68b468179',
        name: 'If',
        type: 'n8n-nodes-base.if',
        version: 2.3,
        position: [-1264, 656],
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
                    leftValue: "={{ $('Idempotency check').item.json.is_duplicate }}",
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
        position: [-1040, 752],
    })
    NoOperationDoNothing = {};

    @node({
        id: '4e4c61cf-cc73-4d08-b3fa-ca90641bf290',
        name: 'Idempotency Cleanup',
        type: 'n8n-nodes-base.executeWorkflow',
        version: 1.3,
        position: [1440, 768],
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
        position: [1296, 768],
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

    @node({
        id: 'aa457a4c-6639-4e90-aa2e-bd04c6f79a6f',
        name: 'Sticky Note1',
        type: 'n8n-nodes-base.stickyNote',
        version: 1,
        position: [928, 736],
    })
    StickyNote1 = {
        content: `Route 3
## Complete
## Listing Pack
**$149.00**`,
        height: 176,
        width: 656,
        color: '#3B0471',
    };

    @node({
        id: 'aa6428a9-49ce-4e8b-b1a3-147691e6566c',
        name: 'Sticky Note2',
        type: 'n8n-nodes-base.stickyNote',
        version: 1,
        position: [928, 544],
    })
    StickyNote2 = {
        content: `Route 2
## Single Full
**$99.00**`,
        height: 176,
        width: 656,
        color: '#014A98',
    };

    @node({
        id: '53ca23e2-165f-47b1-ab72-3ec7d862dd6f',
        name: 'Idempotency Cleanup1',
        type: 'n8n-nodes-base.executeWorkflow',
        version: 1.3,
        position: [1424, 560],
    })
    IdempotencyCleanup1 = {
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
        id: 'fa8552ca-e6f4-442b-ac2a-45d5c4723c2b',
        name: 'data shaper1',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [1296, 560],
    })
    DataShaper1 = {
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

    @node({
        id: 'ef1e539d-ccdf-4ef1-a57f-53f98c3feedf',
        name: 'Idempotency Cleanup2',
        type: 'n8n-nodes-base.executeWorkflow',
        version: 1.3,
        position: [1424, 368],
    })
    IdempotencyCleanup2 = {
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
        id: '0bfa7865-a148-4062-9f65-e09fd9c134f3',
        name: 'data shaper2',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [1296, 368],
    })
    DataShaper2 = {
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

    @node({
        id: '5322a730-fd37-4cfc-abc8-af4593590d81',
        name: 'Sticky Note3',
        type: 'n8n-nodes-base.stickyNote',
        version: 1,
        position: [928, 352],
    })
    StickyNote3 = {
        content: `Route 1
## Single Image
**$49.00**`,
        height: 176,
        width: 656,
        color: '#2B6E4B',
    };

    @node({
        id: '5678d54d-6526-459a-b613-f2d899c64734',
        name: 'Sticky Note4',
        type: 'n8n-nodes-base.stickyNote',
        version: 1,
        position: [864, 272],
    })
    StickyNote4 = {
        content: '# Fulfillment Routing by Product Type',
        height: 672,
        width: 768,
        color: '#CFCECE',
    };

    @node({
        id: '2da639fe-4dad-4151-b025-fcab0b2b5728',
        name: 'call overhead workflow',
        type: 'n8n-nodes-base.executeWorkflow',
        version: 1.3,
        position: [1152, 368],
    })
    CallOverheadWorkflow = {
        workflowId: {
            __rl: true,
            value: 'fD94owK14KYr97yB',
            mode: 'list',
            cachedResultName: 'Overhead-Only',
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
        id: 'ef1077d5-71fb-460d-8355-12c5fe0554ae',
        name: 'call single workflow',
        type: 'n8n-nodes-base.executeWorkflow',
        version: 1.3,
        position: [1152, 560],
    })
    CallSingleWorkflow = {
        workflowId: {
            __rl: true,
            value: 'Tqh6g1yqvcfi5qeF',
            mode: 'list',
            cachedResultName: 'Overhead-North',
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
        id: 'bb06c8b8-cd67-4b91-b3b2-12ebf8e75ea3',
        name: 'call full workflow',
        type: 'n8n-nodes-base.executeWorkflow',
        version: 1.3,
        position: [1152, 768],
    })
    CallFullWorkflow = {
        workflowId: {
            __rl: true,
            value: 'eiHeW6leMz4NRikO',
            mode: 'list',
            cachedResultName: 'Full',
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
        id: 'b7f6777b-95b1-42e4-87e9-b6d7f1bfa2d2',
        name: 'Sticky Note5',
        type: 'n8n-nodes-base.stickyNote',
        version: 1,
        position: [-1120, 416],
    })
    StickyNote5 = {
        content: `## GET RATE LIMITS 
**GET** request [https://app.regrid.com/users/lookup_limits.json](https://app.regrid.com/users/lookup_limits.json)`,
        height: 304,
    };

    @node({
        id: 'e03a00ab-ebee-4c14-9275-f7b01b5eca89',
        name: 'cookie',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [-1040, 560],
    })
    Cookie = {
        url: 'https://auto.brokertricks.com/webhook/cookie',
        options: {},
    };

    @node({
        id: '8381c817-a9aa-4da1-bc04-254afacc7bee',
        name: 'create-kml',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [-368, 560],
    })
    CreateKml = {
        jsCode: `const geojsonRaw = $('path-to-data').first().json.geometry;
const ownerName = $('path-to-data').first().json.fields.owner;
const parcelNumber = $('geo-to-path').first().json.parcelnumb;
const acres = $input.first().json.fields.lglacres;

function coordinatesToKML(coordinates) {
  return coordinates.map(
    ring =>
      ring
        .map(coord => \`\${coord[0].toFixed(7)},\${coord[1].toFixed(7)}\`)
        .join(' ')
  );
}

function polygonToKML(polygonCoords) {
  const rings = coordinatesToKML(polygonCoords);
  return rings
    .map((ring, i) => \`
      \${i === 0 ? '<outerBoundaryIs>' : '<innerBoundaryIs>'}
        <LinearRing>
          <tessellate>1</tessellate>
          <coordinates>
            \${ring}
          </coordinates>
        </LinearRing>
      \${i === 0 ? '</outerBoundaryIs>' : '</innerBoundaryIs>'}
    \`).join('\\n');
}

let placemarkBody = '';
if (geojsonRaw.type === 'Polygon') {
  placemarkBody = \`
    <Polygon>
      <extrude>1</extrude>
      <altitudeMode>clampToGround</altitudeMode>
      \${polygonToKML(geojsonRaw.coordinates)}
    </Polygon>
  \`;
} else if (geojsonRaw.type === 'MultiPolygon') {
  const polygons = geojsonRaw.coordinates.map(
    polygon => \`
      <Polygon>
        <extrude>1</extrude>
        <altitudeMode>clampToGround</altitudeMode>
        \${polygonToKML(polygon)}
      </Polygon>
    \`
  ).join('\\n');
  
  placemarkBody = \`
    <MultiGeometry>
      \${polygons}
    </MultiGeometry>
  \`;
} else {
  throw new Error('Unsupported geometry type: ' + geojsonRaw.type);
}

// Encode the acres variable so the URL doesn't break if there are spaces
const urlSafeAcres = encodeURIComponent(\`\${acres} Acres\`);

const kmlOutput = \`<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <Style id="style">
      <LineStyle>
        <color>ff00ffff</color>
        <width>5</width>
      </LineStyle>
      <PolyStyle>
        <color>00000000</color>
      </PolyStyle>
      <IconStyle>
        <scale>1.2</scale>
        <Icon>
          <href>https://placehold.co/120x40/000000/ffffff/png?text=\${urlSafeAcres}</href>
        </Icon>
      </IconStyle>
    </Style>
    <Placemark id="property-boundary">
      <name>\${parcelNumber}</name>
      <description><![CDATA[
        <b>Owner:</b> \${ownerName}<br>
        <b>Acres:</b> \${acres}
      ]]></description>
      <styleUrl>#style</styleUrl>
      \${placemarkBody}
    </Placemark>
  </Document>
</kml>\`;

return [
  {
    json: {
      kml: kmlOutput
    }
  }
];`,
    };

    @node({
        id: '454b9032-84c7-4e6f-b803-1ab9fe35ee1c',
        name: 'get checkout',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.4,
        position: [-1936, 656],
        credentials: { httpHeaderAuth: { id: 'WqEyKDhHJUyfY0Iz', name: 'surecart' } },
    })
    GetCheckout = {
        url: "=https://api.surecart.com/v1/checkouts/{{ $('Webhook').item.json.body.data.object.checkout }}",
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        options: {},
    };

    @node({
        id: 'cb6c38e5-6a67-4d71-b1d0-d68a441c023f',
        name: 'static map url builder',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [80, 560],
    })
    StaticMapUrlBuilder = {
        assignments: {
            assignments: [
                {
                    id: 'b687ed80-e00e-4108-b1e9-1d1a378ac748',
                    name: 'srcmap',
                    value: '=https://maps.googleapis.com/maps/api/staticmap?size=1200x1200&scale=2&maptype=hybrid&{{ $json.pathString }}&key={{ $env.GOOGLE_API_KEY }}',
                    type: 'string',
                },
                {
                    id: 'fd464050-4749-47b5-bde9-4ecd7b47ab58',
                    name: 'acres',
                    value: "={{ $ifEmpty($ifEmpty($('path-to-data').item.json.fields.lglacres,$('path-to-data').item.json.fields.gisacre),$('path-to-data').item.json.fields.ll_gisacre) }}",
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '6d8fa52b-51b2-4563-a8b2-e524f9cb42bc',
        name: 'geometry to static map url path',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [-144, 560],
    })
    GeometryToStaticMapUrlPath = {
        jsCode: `// Input JSON containing the geometry and coordinates

const coordinates = $('path-to-data').first().json.geometry.coordinates

const color = "0xffff00ff";
const weight = 4;

// Helper function to create the path string with rounded numbers
function createPathString(coordinates) {
  return coordinates.map(coord => {
    const lat = Number(coord[1]).toFixed(7); // Convert to number, round to 7 decimals
    const lon = Number(coord[0]).toFixed(7); // Convert to number, round to 7 decimals
    return \`\${lat},\${lon}\`;
  }).join('|');  // Reverse lat/lon
}

// Build the path string
const pathString = \`path=color:\${color}|weight:\${weight}|\${createPathString(coordinates)}\`;

// Return the result
return [{ json: { pathString: pathString } }];`,
    };

    @node({
        id: '5abad326-5355-45b6-a1c8-699d9ddcbc0f',
        name: 'get user',
        type: 'n8n-nodes-base.wordpress',
        version: 1,
        position: [304, 560],
        credentials: { wordpressApi: { id: 'LARssrhxqUVVlkOR', name: 'get wp user' } },
    })
    GetUser = {
        resource: 'user',
        operation: 'getAll',
        limit: 1,
        options: {
            search: "={{ $input['get checkout'].item.json.email }}",
        },
    };

    @node({
        id: 'e5cbd0f6-28c6-4782-9043-57a162ee7f38',
        name: 'set idempotency key',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-1712, 656],
    })
    SetIdempotencyKey = {
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
                    value: "={{ $('Webhook').item.json.body.data.object.id }}",
                    type: 'string',
                },
                {
                    id: 'd4c8943a-d9ea-4f80-ad91-e1bd1dae2998',
                    name: 'checkout_id',
                    value: "={{ $('Webhook').item.json.body.data.object.checkout }}",
                    type: 'string',
                },
                {
                    id: 'cb93c866-8d99-4174-9c19-3d08e79b4cb5',
                    name: 'customer',
                    value: '={{ $json.customer }}',
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: 'f319373e-f381-415d-88a7-041e547d56b7',
        name: 'Idempotency check',
        type: 'n8n-nodes-base.executeWorkflow',
        version: 1.3,
        position: [-1488, 656],
    })
    IdempotencyCheck = {
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
        id: '2cf32f58-7c85-4841-8631-f111fdb114db',
        webhookId: '109cbc83-2967-47db-8947-cbac80d1a449',
        name: 'Wait',
        type: 'n8n-nodes-base.wait',
        version: 1,
        position: [1300, 768],
    })
    Wait = {
        resume: 'webhook',
        options: {},
    };

    @node({
        id: 'bef32124-b4a5-41f1-82a0-0420eca638e4',
        name: 'Code in JavaScript',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [1450, 768],
    })
    CodeInJavascript = {
        jsCode: `for (const item of $input.all()) {
  // 1. The content of the file
  const fileContent = "Status: Ready - Moonshot Render Complete";
  
  // 2. Convert the string into a binary buffer
  const buffer = Buffer.from(fileContent);

  // 3. Attach it to the n8n item as a binary property named "data"
  item.binary = {
    data: {
      data: buffer.toString('base64'),
      mimeType: 'text/plain',
      fileName: 'ready.txt',
      fileExtension: 'txt'
    }
  };
}

// Return the item, which now includes the original JSON (wpUserId, orderId) 
// PLUS the new binary file ready for upload.
return $input.all();`,
    };

    @node({
        id: '44e08b29-ff29-45de-b296-5974ca9340e4',
        name: 'Upload a file',
        type: 'n8n-nodes-base.s3',
        version: 1,
        position: [1600, 768],
        credentials: { s3: { id: '1GusURtMq14SbO6K', name: 'btx-store-bucket' } },
    })
    UploadAFile = {
        operation: 'upload',
        bucketName: 'btx-store',
        fileName: 'cust_{{ $json.wpuser_id }}/order_{{ $json.order_id }}/ready.txt',
        additionalFields: {},
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.Webhook.out(0).to(this.GetCheckout.in(0));
        this.Switch_.out(0).to(this.CallOverheadWorkflow.in(0));
        this.Switch_.out(1).to(this.CallSingleWorkflow.in(0));
        this.Switch_.out(2).to(this.CallFullWorkflow.in(0));
        this.EditFields.out(0).to(this.Switch_.in(0));
        this.GeoToPath.out(0).to(this.PathToData.in(0));
        this.PathToData.out(0).to(this.CreateKml.in(0));
        this.If_.out(0).to(this.Cookie.in(0));
        this.If_.out(1).to(this.NoOperationDoNothing.in(0));
        this.DataShaper.out(0).to(this.IdempotencyCleanup.in(0));
        this.CallOverheadWorkflow.out(0).to(this.Wait.in(0));
        this.CallSingleWorkflow.out(0).to(this.Wait.in(0));
        this.CallFullWorkflow.out(0).to(this.Wait.in(0));
        this.Wait.out(0).to(this.CodeInJavascript.in(0));
        this.CodeInJavascript.out(0).to(this.UploadAFile.in(0));
        this.UploadAFile.out(0).to(this.DataShaper.in(0));
        this.Cookie.out(0).to(this.GeoToPath.in(0));
        this.CreateKml.out(0).to(this.GeometryToStaticMapUrlPath.in(0));
        this.GetCheckout.out(0).to(this.SetIdempotencyKey.in(0));
        this.GeometryToStaticMapUrlPath.out(0).to(this.StaticMapUrlBuilder.in(0));
        this.StaticMapUrlBuilder.out(0).to(this.GetUser.in(0));
        this.GetUser.out(0).to(this.EditFields.in(0));
        this.SetIdempotencyKey.out(0).to(this.IdempotencyCheck.in(0));
        this.IdempotencyCheck.out(0).to(this.If_.in(0));
    }
}
