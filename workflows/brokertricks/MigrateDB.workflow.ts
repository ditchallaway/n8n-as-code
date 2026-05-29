import { workflow, node, links } from '@n8n-as-code/transformer';

@workflow({
  id: 'TempMigrationId01',
  name: 'MigrateDB',
  active: false
})
export class MigrateDBWorkflow {
  @node({
    name: 'Alter Table',
    type: 'n8n-nodes-base.postgres',
    version: 2.6,
    credentials: { postgres: { id: 'WQPTR9tzMvuDweJv', name: 'Postgres account' } }
  })
  AlterTable = {
    operation: 'executeQuery',
    query: `
      ALTER TABLE idempotency_keys 
      ADD COLUMN IF NOT EXISTS surecart_timestamp TIMESTAMP,
      ADD COLUMN IF NOT EXISTS system_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `,
    options: {}
  };

  @links()
  defineRouting() {}
}
