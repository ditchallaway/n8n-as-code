import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : Fulfill
// Nodes   : 2  |  Connections: 1
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// Webhook                            webhook
// FulfillInSurecart                  httpRequest                [creds]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// Webhook
//    → FulfillInSurecart
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'HbDy7lPJR0bqj3uS',
    name: 'Fulfill',
    active: true,
    isArchived: false,
    settings: { executionOrder: 'v1', availableInMCP: false, callerPolicy: 'workflowsFromSameOwner' },
})
export class FulfillWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

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
    FulfillInSurecart = {
        method: 'PATCH',
        url: 'https://api.surecart.com/v1/fulfillments/{{ $json.body.fulfillment_id }}',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={
  "status": "fulfilled"
}`,
        options: {},
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.Webhook.out(0).to(this.FulfillInSurecart.in(0));
    }
}
