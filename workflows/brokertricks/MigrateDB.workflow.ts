import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : MigrateDB
// Nodes   : 1  |  Connections: 0
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// AlterTable                         postgres                   [creds]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// </workflow-map>

// =====================================================================
// WORKFLOW METADATA
// =====================================================================

@workflow({
    id: 'VL9ZeeRE8Be0Wxvb',
    name: 'MigrateDB',
    active: false,
    isArchived: false,
    settings: { executionOrder: 'v1' },
})
export class MigratedbWorkflow {
    // =====================================================================
    // NODE CONFIGURATION
    // =====================================================================

    @node({
        id: '6b62af00-0375-4602-a274-d0ad2ee2c382',
        name: 'Alter Table',
        type: 'n8n-nodes-base.postgres',
        version: 2.6,
        position: [0, 0],
        credentials: { postgres: { id: 'WQPTR9tzMvuDweJv', name: 'Postgres account' } },
    })
    AlterTable = {
        operation: 'executeQuery',
        query: `
      ALTER TABLE idempotency_keys 
      ADD COLUMN IF NOT EXISTS surecart_timestamp TIMESTAMP,
      ADD COLUMN IF NOT EXISTS system_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `,
        options: {},
    };

    // =====================================================================
    // ROUTING AND CONNECTIONS
    // =====================================================================

    @links()
    defineRouting() {
        // No connections defined
    }
}
