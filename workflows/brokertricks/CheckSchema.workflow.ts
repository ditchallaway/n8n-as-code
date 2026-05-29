import { workflow, node, links } from '@n8n-as-code/transformer';

@workflow({
  name: 'Check Schema Temp',
  active: false
})
export class CheckSchemaWorkflow {
  @node({
    name: 'Check Schema',
    type: 'n8n-nodes-base.postgres',
    version: 2.6,
    credentials: { postgres: { id: 'WQPTR9tzMvuDweJv', name: 'Postgres account' } }
  })
  CheckSchema = {
    operation: 'executeQuery',
    query: "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'idempotency_keys';",
    options: {}
  };

  @links()
  defineRouting() {}
}
