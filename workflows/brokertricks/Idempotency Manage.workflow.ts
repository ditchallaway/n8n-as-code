import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : Idempotency Manage
// Nodes   : 6  |  Connections: 5
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// WhenExecutedByAnotherWorkflow      executeWorkflowTrigger
// Switch_                            switch
// ExecuteASqlQuery                   postgres                   [creds]
// CleanupStuckKeys                   postgres                   [creds]
// InsertIdempotencyKey               postgres                   [creds]
// FormatCheckResposne                set
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// WhenExecutedByAnotherWorkflow
//    → Switch_
//      → CleanupStuckKeys
//        → InsertIdempotencyKey
//          → FormatCheckResposne
//     .out(1) → ExecuteASqlQuery
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'Siddcwr4PORBPgdL',
    name: 'Idempotency Manage',
    active: true,
    isArchived: false,
    settings: { executionOrder: 'v1', binaryMode: 'separate' },
})
export class IdempotencyManageWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '343e8344-16cc-46d1-bbf5-29a45ff3fdf5',
        name: 'When Executed by Another Workflow',
        type: 'n8n-nodes-base.executeWorkflowTrigger',
        version: 1.1,
        position: [-352, 64],
    })
    WhenExecutedByAnotherWorkflow = {
        inputSource: 'passthrough',
    };

    @node({
        id: 'a3635fb9-ee27-4b0b-82d9-54c8ade8d2de',
        name: 'Switch',
        type: 'n8n-nodes-base.switch',
        version: 3.4,
        position: [-128, 64],
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
                            version: 3,
                        },
                        conditions: [
                            {
                                leftValue: '={{ $json.action }}',
                                rightValue: 'check',
                                operator: {
                                    type: 'string',
                                    operation: 'equals',
                                },
                                id: 'fb7fad9b-a090-4b6a-98f5-1920ccfc8780',
                            },
                        ],
                        combinator: 'and',
                    },
                },
                {
                    conditions: {
                        options: {
                            caseSensitive: true,
                            leftValue: '',
                            typeValidation: 'strict',
                            version: 3,
                        },
                        conditions: [
                            {
                                id: '984b9e75-6556-4a95-8c31-6af5e9484930',
                                leftValue: '={{ $json.action }}',
                                rightValue: 'complete',
                                operator: {
                                    type: 'string',
                                    operation: 'equals',
                                    name: 'filter.operator.equals',
                                },
                            },
                        ],
                        combinator: 'and',
                    },
                },
            ],
        },
        options: {},
    };

    @node({
        id: '98253374-25b5-4e31-9310-d4012669a08b',
        name: 'Execute a SQL query',
        type: 'n8n-nodes-base.postgres',
        version: 2.6,
        position: [96, 160],
        credentials: { postgres: { id: 'WQPTR9tzMvuDweJv', name: 'Postgres account' } },
    })
    ExecuteASqlQuery = {
        operation: 'executeQuery',
        query: `UPDATE idempotency_keys 
SET status = $2 
WHERE idempotency_key = $1;`,
        options: {
            queryReplacement: "={{ [$('When Executed by Another Workflow').item.json.idempotency_key, $('When Executed by Another Workflow').item.json.final_status || 'pending_human_review'] }}",
        },
    };

    @node({
        id: 'c7a2e1f0-3b4d-4e5f-9a6b-8c7d0e1f2a3b',
        name: 'Initialize Database',
        type: 'n8n-nodes-base.postgres',
        version: 2.6,
        position: [-16, -96],
        credentials: { postgres: { id: 'WQPTR9tzMvuDweJv', name: 'Postgres account' } },
    })
    InitializeDatabase = {
        operation: 'executeQuery',
        query: `ALTER TABLE idempotency_keys 
ADD COLUMN IF NOT EXISTS surecart_timestamp TIMESTAMP,
ADD COLUMN IF NOT EXISTS system_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`,
        options: {},
    };

    @node({
        id: '9211c471-fbe7-4a0b-967a-12cf2c7f5f0b',
        name: 'Insert Idempotency Key',
        type: 'n8n-nodes-base.postgres',
        version: 2.6,
        position: [128, -96],
        credentials: { postgres: { id: 'WQPTR9tzMvuDweJv', name: 'Postgres account' } },
    })
    InsertIdempotencyKey = {
        operation: 'executeQuery',
        query: `WITH inserted AS (
  INSERT INTO idempotency_keys (idempotency_key, status, surecart_timestamp)
  VALUES ($1, 'received', $2::timestamp)
  ON CONFLICT (idempotency_key) DO NOTHING
  RETURNING idempotency_key
)
SELECT EXISTS(SELECT 1 FROM inserted) as is_new;`,
        options: {
            queryReplacement: "={{ [$('When Executed by Another Workflow').item.json.idempotency_key, $('When Executed by Another Workflow').item.json.surecart_timestamp] }}",
        },
    };

    @node({
        id: '9fc833d2-4132-4207-82d2-a80435023625',
        name: 'Format Check Resposne',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [272, -96],
    })
    FormatCheckResposne = {
        assignments: {
            assignments: [
                {
                    id: 'b7a782e4-ee32-4ade-9cd6-be8d6e9147b1',
                    name: 'is_duplicate',
                    value: '={{ $json.is_new ? false : true }}',
                    type: 'boolean',
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
        this.WhenExecutedByAnotherWorkflow.out(0).to(this.Switch_.in(0));
        this.Switch_.out(0).to(this.InitializeDatabase.in(0));
        this.InitializeDatabase.out(0).to(this.InsertIdempotencyKey.in(0));
        this.InsertIdempotencyKey.out(0).to(this.FormatCheckResposne.in(0));
        this.Switch_.out(1).to(this.ExecuteASqlQuery.in(0));
    }
}
