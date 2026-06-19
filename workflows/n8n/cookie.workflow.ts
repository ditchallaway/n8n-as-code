import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : cookie
// Nodes   : 11  |  Connections: 10
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// Html                               html
// HttpRequest                        httpRequest
// HttpRequest1                       httpRequest
// EditFields1                        set
// EditFields2                        set
// EditFields                         set
// CheckLoginStatus                   if
// RespondWithError                   respondToWebhook
// HttpRequest2                       httpRequest
// Webhook                            webhook
// RespondToWebhook                   respondToWebhook
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// Webhook
//    → HttpRequest1
//      → EditFields2
//        → Html
//          → EditFields1
//            → HttpRequest
//              → EditFields
//                → CheckLoginStatus
//                  → HttpRequest2
//                    → RespondToWebhook
//                 .out(1) → RespondWithError
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'sTOjWDor1GgzoCCt',
    name: 'cookie',
    active: true,
    description: 'get a cookie from here before calling the regrid api',
    isArchived: false,
    settings: {
        executionOrder: 'v1',
        callerPolicy: 'workflowsFromSameOwner',
        availableInMCP: false,
        binaryMode: 'separate',
    },
})
export class CookieWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '462dc124-85d2-4d72-afea-92f98097086b',
        name: 'HTML',
        type: 'n8n-nodes-base.html',
        version: 1.2,
        position: [736, 0],
    })
    Html = {
        operation: 'extractHtmlContent',
        dataPropertyName: 'html',
        extractionValues: {
            values: [
                {
                    key: 'authenticity_token',
                    cssSelector: 'input[name="authenticity_token"]',
                    returnValue: 'attribute',
                    attribute: 'value',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '4ce9fcb7-ddc0-48f6-9473-430da9722103',
        name: 'HTTP Request',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [1184, 0],
    })
    HttpRequest = {
        method: 'POST',
        url: 'https://app.regrid.com/users/sign_in',
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'accept',
                    value: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
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
                    name: 'origin',
                    value: 'https://app.regrid.com',
                },
                {
                    name: 'pragma',
                    value: 'no-cache',
                },
                {
                    name: 'priority',
                    value: 'u=0, i',
                },
                {
                    name: 'referer',
                    value: 'https://app.regrid.com/users/sign_in',
                },
                {
                    name: 'sec-ch-ua',
                    value: '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
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
                    value: 'document',
                },
                {
                    name: 'sec-fetch-mode',
                    value: 'navigate',
                },
                {
                    name: 'sec-fetch-site',
                    value: 'same-origin',
                },
                {
                    name: 'sec-fetch-user',
                    value: '?1',
                },
                {
                    name: 'upgrade-insecure-requests',
                    value: '1',
                },
                {
                    name: 'user-agent',
                    value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
                },
                {
                    name: 'cookie',
                    value: "={{ $('Edit Fields2').item.json['session-cookie'] }}",
                },
            ],
        },
        sendBody: true,
        contentType: 'form-urlencoded',
        bodyParameters: {
            parameters: [
                {
                    name: 'utf8',
                    value: '✓',
                },
                {
                    name: 'authenticity_token',
                    value: "={{ $json['login-token'] }}",
                },
                {
                    name: '_return_to',
                    value: '/users/sign_in?form=signin',
                },
                {
                    name: 'user[email]',
                    value: '={{ $env.REGRID_EMAIL }}',
                },
                {
                    name: 'user[password]',
                    value: '={{ $env.REGRID_PASSWORD }}',
                },
                {
                    name: 'commit',
                    value: 'Sign In',
                },
            ],
        },
        options: {
            redirect: {
                redirect: {
                    followRedirects: false,
                },
            },
            response: {
                response: {
                    fullResponse: true,
                    neverError: true,
                },
            },
        },
    };

    @node({
        id: 'cf86cbd4-d74c-435a-80ac-e1d37c27deb8',
        name: 'HTTP Request1',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [288, 0],
    })
    HttpRequest1 = {
        url: 'https://app.regrid.com/users/sign_in',
        options: {
            response: {
                response: {
                    fullResponse: true,
                },
            },
        },
    };

    @node({
        id: '598e0360-7caa-42c0-9e10-7098e424e332',
        name: 'Edit Fields1',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [960, 0],
    })
    EditFields1 = {
        assignments: {
            assignments: [
                {
                    id: 'ca0bb726-0869-4539-b9d6-b2a6bdedbc31',
                    name: 'login-token',
                    value: '={{ $json.authenticity_token }}',
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: 'd314f115-03d6-4f6d-a992-6623560465e9',
        name: 'Edit Fields2',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [512, 0],
    })
    EditFields2 = {
        assignments: {
            assignments: [
                {
                    id: 'cb927ac6-d349-45b4-9f3b-f50022616929',
                    name: 'session-cookie',
                    value: "={{ $json.headers['set-cookie'][0] }}",
                    type: 'string',
                },
                {
                    id: 'e77b4d3f-3da0-4477-905a-177bcb7fcaa4',
                    name: 'html',
                    value: '={{ $json.data }}',
                    type: 'string',
                },
            ],
        },
        options: {
            dotNotation: true,
        },
    };

    @node({
        id: '8fbe9e54-8552-426e-9945-f0fdffb75f32',
        name: 'Edit Fields',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [1408, 0],
    })
    EditFields = {
        assignments: {
            assignments: [
                {
                    id: '3d411902-a481-48c1-bd0f-99d3793aa72e',
                    name: 'user_id_cookie',
                    value: '={{ $json.headers["set-cookie"][0].split(\';\')[0] }}',
                    type: 'string',
                },
                {
                    id: '7f564e97-4d19-4485-9c31-bf66d7df843c',
                    name: 'user_expires_cookie',
                    value: '={{ $json.headers["set-cookie"][1].split(\';\')[0] }}',
                    type: 'string',
                },
                {
                    id: '36ca191c-4bc3-4d22-9634-43ba84d9f72a',
                    name: 'session_id_cookie',
                    value: '={{ $json.headers["set-cookie"][2].split(\';\')[0] }}',
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: 'ab2c9f45-1234-4567-89ab-cdef01234567',
        name: 'Check Login Status',
        type: 'n8n-nodes-base.if',
        version: 1,
        position: [1520, 0],
    })
    CheckLoginStatus = {
        conditions: {
            string: [
                {
                    value1: '={{ $json.user_expires_cookie }}',
                    operation: 'isNotEmpty',
                },
            ],
        },
    };

    @node({
        id: 'cd3e0f56-2345-5678-90bc-def012345678',
        name: 'Respond with Error',
        type: 'n8n-nodes-base.respondToWebhook',
        version: 1.4,
        position: [1632, 200],
    })
    RespondWithError = {
        respondWith: 'json',
        responseBody: `={
  "success": false,
  "error": "Login failed. Invalid email or password."
}`,
        options: {
            responseCode: 401,
        },
    };

    @node({
        id: 'f49f9c95-dcd6-4d5a-a0c4-a2688b124d91',
        name: 'HTTP Request2',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [1632, 0],
    })
    HttpRequest2 = {
        url: 'https://app.regrid.com/users/lookup_limits.json',
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'Cookie',
                    value: '={{ $node["Edit Fields"].json["user_id_cookie"] }}; {{ $node["Edit Fields"].json["session_id_cookie"] }}; {{ $node["Edit Fields"].json["user_expires_cookie"] }}',
                },
                {
                    name: 'User-Agent',
                    value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
                },
                {
                    name: 'sec-ch-ua',
                    value: '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
                },
                {
                    name: 'sec-ch-ua-platform',
                    value: '"Windows"',
                },
                {
                    name: 'Referer',
                    value: 'https://app.regrid.com/us',
                },
                {
                    name: 'Accept',
                    value: '*/*',
                },
            ],
        },
        options: {
            response: {
                response: {
                    fullResponse: true,
                },
            },
        },
    };

    @node({
        id: '066d7052-05d7-4cd8-9b59-61ee86802805',
        webhookId: '53d029f0-fb5c-4c94-a519-f1637b6e3bd2',
        name: 'Webhook',
        type: 'n8n-nodes-base.webhook',
        version: 2.1,
        position: [64, 0],
    })
    Webhook = {
        path: 'cookie',
        responseMode: 'responseNode',
        options: {},
    };

    @node({
        id: 'cac5d964-3219-457e-ba66-d07642a5ef5d',
        name: 'Respond to Webhook',
        type: 'n8n-nodes-base.respondToWebhook',
        version: 1.4,
        position: [1856, 0],
    })
    RespondToWebhook = {
        responseBody: `={
  "auth_success": true,
  "remaining": {{ $json.body.remaining }},
  "cookie_header_string": "{{ $node["Edit Fields"].json["user_id_cookie"] }}; {{ $node["Edit Fields"].json["session_id_cookie"] }}; {{ $node["Edit Fields"].json["user_expires_cookie"] }}",
  "csrf_token": "{{ $('Edit Fields1').item.json['login-token'] }}"
}`,
        options: {
            responseCode: 200,
        },
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.Html.out(0).to(this.EditFields1.in(0));
        this.HttpRequest1.out(0).to(this.EditFields2.in(0));
        this.EditFields1.out(0).to(this.HttpRequest.in(0));
        this.EditFields2.out(0).to(this.Html.in(0));
        this.HttpRequest.out(0).to(this.EditFields.in(0));
        this.EditFields.out(0).to(this.CheckLoginStatus.in(0));
        this.CheckLoginStatus.out(0).to(this.HttpRequest2.in(0));
        this.CheckLoginStatus.out(1).to(this.RespondWithError.in(0));
        this.Webhook.out(0).to(this.HttpRequest1.in(0));
        this.HttpRequest2.out(0).to(this.RespondToWebhook.in(0));
    }
}
