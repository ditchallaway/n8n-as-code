import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : cookie
// Nodes   : 14  |  Connections: 15
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
// Getcookietable                     dataTable
// Loopcredentials                    splitInBatches
// Checklimits                        if
// Webhook                            webhook
// RespondToWebhook                   respondToWebhook
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// Webhook
//    → Getcookietable
//      → Loopcredentials
//        → HttpRequest1
//          → EditFields2
//            → Html
//              → EditFields1
//                → HttpRequest
//                  → EditFields
//                    → CheckLoginStatus
//                      → HttpRequest2
//                        → Checklimits
//                          → RespondToWebhook
//                         .out(1) → Loopcredentials (↩ loop)
//                     .out(1) → Loopcredentials (↩ loop)
//       .out(1) → RespondWithError
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
                    value: "={{ $('Loopcredentials').item.json.email }}",
                },
                {
                    name: 'user[password]',
                    value: "={{ $('Loopcredentials').item.json.password }}",
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
                {
                    id: 'e51a873d-9098-40d1-bb4b-03ca1d9a0b66',
                    name: '',
                    value: '',
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
            options: {
                caseSensitive: true,
                leftValue: '',
                typeValidation: 'strict',
            },
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
                    value: '={{ "_cfuvid=7csKHP6W85bYjnpNno4N5We0HcNXTtXuzZWT2cKDkOY-1761520842173-0.0.1.1-604800000; cebs=1; _ce.clock_data=456%2C38.165.151.88%2C1%2C2204ee63bef2f351470a66ffe1bb020e%2CChrome%2CUS; _CEFT=Q%3D%3D%3D; _gid=GA1.2.1154851228.1761520845; _gcl_au=1.1.1029524293.1761532477; _uetsid=ce1d5570b2bb11f0a575b7a04624eda4; _uetvid=e1adc100b1f011f097690d5f95f8f890; __hstc=243024157.ab6268d4e9adaecba9c646cb085cf2f3.1761532478420.1761532478420.1761532478420.1; hubspotutk=ab6268d4e9adaecba9c646cb085cf2f3; __hssrc=1; __hssc=243024157.1.1761532478420; __hs_notify_banner_dismiss=true; " + $node["Edit Fields"].json["user_id_cookie"] + "; " + $node["Edit Fields"].json["session_id_cookie"] + "; __cf_bm=bdjD_r0cDMok2upNxRFpUSdgQXkM7CErwAvoliuWqXI-1761533972-1.0.1.1-Kg8e8VJlpb7DQwK8FNWcxsM5WPyuvlH41E0O9LzlJ80foVBIlKU6s3OFrolaE.Y13hGreCX8NTj9TaKuJ12A8DcKj4nMTTJFNjIG5OfffTs; cebsp_=8; _ga=GA1.1.1792884763.1761520845; _ga_NGWML8455J=GS2.1.s1761532471$o6$g1$t1761533994$j37$l0$h0; " + $node["Edit Fields"].json["user_expires_cookie"] + "; _ce.s=v~7b4d565b6255ca58619f4de16e64c95f09992778~lcw~1761534128256~vir~returning~lva~1761533973882~vpv~0~v11ls~7863ac40-b2dd-11f0-833d-a57a9309c672~gtrk.la~mh8jxsaw~v11.cs~392098~v11.s~7863ac40-b2dd-11f0-833d-a57a9309c672~v11.vs~7b4d565b6255ca58619f4de16e64c95f09992778~v11.fsvd~eyJ1cmwiOiJhcHAucmVncmlkLmNvbSIsInJlZiI6IiIsInV0bSI6W119~v11.sla~1761532472582~lcw~1761534128264" }}',
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
        id: '2019b889-1cd2-4e89-8d19-482811a2f2b3',
        name: 'GetCookieTable',
        type: 'n8n-nodes-base.dataTable',
        version: 1.1,
        position: [150, 0],
    })
    Getcookietable = {
        resource: 'row',
        operation: 'get',
        dataTableId: {
            mode: 'list',
            value: 'ZxIKw9wy4CcVYJBF',
        },
        returnAll: true,
    };

    @node({
        id: '9dfa9a83-a9c8-479c-b17b-232158863f69',
        name: 'Loopcredentials',
        type: 'n8n-nodes-base.splitInBatches',
        version: 1,
        position: [200, 0],
    })
    Loopcredentials = {
        batchSize: 1,
        options: {},
    };

    @node({
        id: 'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d',
        name: 'Checklimits',
        type: 'n8n-nodes-base.if',
        version: 2.3,
        position: [1750, 0],
    })
    Checklimits = {
        conditions: {
            options: {
                caseSensitive: true,
                leftValue: '',
                typeValidation: 'strict',
                version: 3,
            },
            conditions: [
                {
                    id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
                    leftValue: '={{ $json.body.remaining }}',
                    rightValue: 2,
                    operator: {
                        type: 'number',
                        operation: 'gt',
                    },
                },
            ],
            combinator: 'and',
        },
        options: {},
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
        respondWith: 'json',
        responseBody: `={
  "auth_success": true,
  "remaining": {{ $json.body.remaining }},
  "cookie_header_string": "{{ "_cfuvid=7csKHP6W85bYjnpNno4N5We0HcNXTtXuzZWT2cKDkOY-1761520842173-0.0.1.1-604800000; cebs=1; _ce.clock_data=456%2C38.165.151.88%2C1%2C2204ee63bef2f351470a66ffe1bb020e%2CChrome%2CUS; _CEFT=Q%3D%3D%3D; _gid=GA1.2.1154851228.1761520845; _gcl_au=1.1.1029524293.1761532477; _uetsid=ce1d5570b2bb11f0a575b7a04624eda4; _uetvid=e1adc100b1f011f097690d5f95f8f890; __hstc=243024157.ab6268d4e9adaecba9c646cb085cf2f3.1761532478420.1761532478420.1761532478420.1; hubspotutk=ab6268d4e9adaecba9c646cb085cf2f3; __hssrc=1; __hssc=243024157.1.1761532478420; __hs_notify_banner_dismiss=true; " + $node["Edit Fields"].json["user_id_cookie"] + "; " + $node["Edit Fields"].json["session_id_cookie"] + "; __cf_bm=bdjD_r0cDMok2upNxRFpUSdgQXkM7CErwAvoliuWqXI-1761533972-1.0.1.1-Kg8e8VJlpb7DQwK8FNWcxsM5WPyuvlH41E0O9LzlJ80foVBIlKU6s3OFrolaE.Y13hGreCX8NTj9TaKuJ12A8DcKj4nMTTJFNjIG5OfffTs; cebsp_=8; _ga=GA1.1.1792884763.1761520845; _ga_NGWML8455J=GS2.1.s1761532471$o6$g1$t1761533994$j37$l0$h0; " + $node["Edit Fields"].json["user_expires_cookie"] + "; _ce.s=v~7b4d565b6255ca58619f4de16e64c95f09992778~lcw~1761534128256~vir~returning~lva~1761533973882~vpv~0~v11ls~7863ac40-b2dd-11f0-833d-a57a9309c672~gtrk.la~mh8jxsaw~v11.cs~392098~v11.s~7863ac40-b2dd-11f0-833d-a57a9309c672~v11.vs~7b4d565b6255ca58619f4de16e64c95f09992778~v11.fsvd~eyJ1cmwiOiJhcHAucmVncmlkLmNvbSIsInJlZiI6IiIsInV0bSI6W119~v11.sla~1761532472582~lcw~1761534128264" }} ... ; user.id={{ $('Edit Fields').item.json.user_id_cookie }}; _session_id={{ $node["Edit Fields"].json["session_id_cookie"] }}; __cf_bm=... ; user.expires_at={{ $node["Edit Fields"].json["user_expires_cookie"] }}"
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
        this.CheckLoginStatus.out(1).to(this.Loopcredentials.in(0));
        this.Webhook.out(0).to(this.Getcookietable.in(0));
        this.Getcookietable.out(0).to(this.Loopcredentials.in(0));
        this.Loopcredentials.out(0).to(this.HttpRequest1.in(0));
        this.Loopcredentials.out(1).to(this.RespondWithError.in(0));
        this.HttpRequest2.out(0).to(this.Checklimits.in(0));
        this.Checklimits.out(0).to(this.RespondToWebhook.in(0));
        this.Checklimits.out(1).to(this.Loopcredentials.in(0));
    }
}
