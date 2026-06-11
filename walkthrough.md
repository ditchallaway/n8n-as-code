# Walkthrough - Shorten Photopea Editor URLs in Workflows

We have integrated the Cloudflare-based **Sink link shortener** (`https://link.brokertricks.com`) into our n8n workflows (`Overhead-North`, `Overhead-Only`, `Full`). 

By doing this, the massive base64-encoded Photopea configuration embedded in the `editorUrl` is now compressed to a short, clean link before being sent to external services (like `ntfy.sh` and SureCart notes), successfully bypassing any header size or database string length constraints.

## Changes Made

1. **Shorten Editor URL Node**: 
   Added a new HTTP Request node `Shorten Editor URL` to each of the three workflows:
   * **Target API**: `POST https://link.brokertricks.com/api/link/create`
   * **Authentication**: Bearer `{{ $env.NUXT_SITE_TOKEN }}`
   * **Request Body**: `{"url": "{{ $json.editorUrl }}", "comment": "Editor URL for order_{{ $json.order_id }}"}`

2. **Workflows Alignment & Shifting**:
   * **`Overhead-North` / `Overhead-Only`**:
     * Inserted `ShortenEditorUrl` at `[600, 176]`.
     * Shifted downstream nodes `BackupEditorUrl`, `Ntfy`, and `RespondToWebhook` rightward by +200px.
     * Modified `BackupEditorUrl` to use `$json.shortLink` and to fetch order ID deterministically from the preceding `all images url builder` node.
     * Updated `Ntfy` node's message body and Click URL to point to the shortLink.
     * Updated `RespondToWebhook` node's response body.
   * **`Full`**:
     * Inserted `ShortenEditorUrl` at `[1616, 176]`.
     * Shifted all downstream nodes (`CheckForNotes`, `If_`, `CreateANote`, `HttpRequest1`, `NtfySend`, `RespondToWebhook`) rightward by +224px.
     * Updated `CheckForNotes` to request the check on `$json.shortLink`.
     * Updated `CreateANote` and `HttpRequest1` to post the note body and note metadata using the shortened URL reference `$('Shorten Editor URL').item.json.shortLink`.
     * Updated `RespondToWebhook` to return the `Shorten Editor URL` short link.

3. **Routing Configuration**:
   * Updated `defineRouting()` in all three workflow files to correctly place the new node in the pipeline: `AllImagesUrlBuilder -> ShortenEditorUrl -> [Downstream logic]`.

## Verification Results

* **Local Validation**: 
  Validated all modified workflow files locally in WSL using `npx n8nac skills validate`:
  ```bash
  $ npx n8nac skills validate workflows/brokertricks/Overhead-North.workflow.ts
  ✅ Workflow is valid!

  $ npx n8nac skills validate workflows/brokertricks/Overhead-Only.workflow.ts
  ✅ Workflow is valid!

  $ npx n8nac skills validate workflows/brokertricks/Full.workflow.ts
  ✅ Workflow is valid but has warnings (Parameter validation skipped for community ntfySend node type)
  ```

* **Remote Push Verification**:
  Pushed and verified all updated workflows to the remote n8n instance successfully:
  * Pushed **`Overhead-North`** (ID: `Tqh6g1yqvcfi5qeF`) -> Verified clean.
  * Pushed **`Overhead-Only`** (ID: `fD94owK14KYr97yB`) -> Verified clean.
  * Pushed **`Full`** (ID: `eiHeW6leMz4NRikO`) -> Verified clean.
