import { workflow, node, links } from '@n8n-as-code/transformer';

@workflow({
    id: 'fD94owK14KYr97yF',
    name: 'Fulfill',
    active: true,
    isArchived: false,
    settings: {
        executionOrder: 'v1',
        callerPolicy: 'workflowsFromSameOwner',
        availableInMCP: false,
    },
})
export class FulfillWorkflow {
    @node({
        id: '2022c937-1d99-481f-8e6a-2ce76e85e822',
        webhookId: '1ccdd082-8344-4377-9f4e-55d03d5029b9',
        name: 'Webhook',
        type: 'n8n-nodes-base.webhook',
        version: 2.1,
        position: [100, 100],
    })
    Webhook = {
        httpMethod: 'POST',
        path: 'fulfill',
        responseMode: 'lastNode',
        options: {},
    };

    @node({
        id: 'ba68cdaf-96af-4117-b38f-286fbb6b12ff',
        name: 'Fulfill in SureCart',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [300, 100],
        credentials: {
            httpBearerAuth: { id: 'fs3UN7UYgrHE4ads', name: 'surecart' },
            httpHeaderAuth: { id: 'WqEyKDhHJUyfY0Iz', name: 'surecart' },
        },
    })
    FulfillInSureCart = {
        method: 'POST',
        url: 'https://api.surecart.com/v1/fulfillments',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={
  "fulfillment": {
    "order": "{{ $json.body.order_id }}"
  }
}`,
        options: {},
    };

    @links()
    defineRouting() {
        this.Webhook.out(0).to(this.FulfillInSureCart.in(0));
    }
}
