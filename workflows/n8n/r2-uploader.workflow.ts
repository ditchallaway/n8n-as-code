import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : r2-uploader
// Nodes   : 2  |  Connections: 1
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// Webhook                            webhook
// UploadAFile                        s3                         [creds]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// Webhook
//    → UploadAFile
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'w47RNf4u6ke5KVTr',
    name: 'r2-uploader',
    active: true,
    isArchived: false,
    projectId: 'SxZfT7rxAv9cKdRm',
    settings: { executionOrder: 'v1', binaryMode: 'separate' },
})
export class R2UploaderWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '06bca24e-8eeb-4d26-8edf-20789b68464b',
        webhookId: '6a30a519-4f3e-4191-aaea-de821f326451',
        name: 'Webhook',
        type: 'n8n-nodes-base.webhook',
        version: 2.1,
        position: [0, 0],
    })
    Webhook = {
        httpMethod: 'POST',
        path: 'bucket',
        options: {
            binaryPropertyName: 'data',
        },
    };

    @node({
        id: '83c89ed2-d285-4d93-b29b-a0a1a4f1d2d1',
        name: 'Upload a file',
        type: 'n8n-nodes-base.s3',
        version: 1,
        position: [208, 0],
        credentials: { s3: { id: '1GusURtMq14SbO6K', name: 'btx-store-bucket' } },
    })
    UploadAFile = {
        operation: 'upload',
        bucketName: 'btx-store',
        additionalFields: {},
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.Webhook.out(0).to(this.UploadAFile.in(0));
    }
}
