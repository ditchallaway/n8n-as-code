---
name: surecart
description: Reference and guidelines for working with the SureCart developer docs and API.
---

# SureCart API & Developer Reference

This skill provides guides, webhook shapes, and schemas for interacting with the SureCart REST API and WordPress integration. 

## Base URL & Authentication

SureCart API requests must be sent to the base URL:
```
https://api.surecart.com/v1
```

All API requests require Bearer Token authentication via the `Authorization` header:
```http
Authorization: Bearer YOUR_SURECART_API_KEY
```

> [!NOTE]
> In n8n, this is configured via the `httpHeaderAuth` credential type using the header name `Authorization` and value `Bearer YOUR_SURECART_API_KEY`.

---

## Local OpenAPI Specifications

To avoid making network requests for API schemas, the full OpenAPI 3.1.0 specifications are stored locally in the `references/` directory under this skill. You can search or view these files directly:

* **[orders.json](file:///home/user/Brokertricks/Repositories/n8n-as-code/.agents/skills/surecart/references/orders.json)**: Checkouts, charges, invoices, refunds, and disputes.
* **[products.json](file:///home/user/Brokertricks/Repositories/n8n-as-code/.agents/skills/surecart/references/products.json)**: Products, prices, variant options, and variant values.
* **[subscriptions.json](file:///home/user/Brokertricks/Repositories/n8n-as-code/.agents/skills/surecart/references/subscriptions.json)**: Subscriptions, billing periods, swaps, and cancellations.
* **[customers.json](file:///home/user/Brokertricks/Repositories/n8n-as-code/.agents/skills/surecart/references/customers.json)**: Customers, customer portals, and balance transactions.
* **[public.json](file:///home/user/Brokertricks/Repositories/n8n-as-code/.agents/skills/surecart/references/public.json)**: Public licensing and checkout verification codes.
* **[shipping.json](file:///home/user/Brokertricks/Repositories/n8n-as-code/.agents/skills/surecart/references/shipping.json)**: Shipping zones, rates, profiles, and shipments.
* **[tax.json](file:///home/user/Brokertricks/Repositories/n8n-as-code/.agents/skills/surecart/references/tax.json)**: Tax registrations, zones, and overrides.
* **[licensing.json](file:///home/user/Brokertricks/Repositories/n8n-as-code/.agents/skills/surecart/references/licensing.json)**: Licensing activations and keys.
* **[affiliates.json](file:///home/user/Brokertricks/Repositories/n8n-as-code/.agents/skills/surecart/references/affiliates.json)**: Affiliates, clicks, referrals, and payouts.
* **[core.json](file:///home/user/Brokertricks/Repositories/n8n-as-code/.agents/skills/surecart/references/core.json)**: Base account, branding, and webhook configurations.

### How to use them
If you need to check the query parameters, body schema, or response model for an endpoint (e.g., creating a checkout), use `grep_search` on the specific JSON file above or view it with `view_file`.

---

## Webhooks

SureCart webhooks send a `POST` request with a JSON payload containing an `Event` object.

### Event Payload Structure
A typical webhook event payload (e.g., `order.paid`) looks like this:
```json
{
  "id": "evt_123456789",
  "object": "event",
  "type": "order.paid",
  "live_mode": true,
  "data": {
    "object": {
      "id": "ord_123456789",
      "object": "order",
      "number": "1001",
      "customer": "cust_123456789",
      "checkout": "chk_123456789",
      "status": "completed",
      "total_amount": 9900,
      "currency": "usd",
      "metadata": {
        "price_id": "price_123456",
        "pid": "prod_123456",
        "submission_id": "sub_123456",
        "parcel": "apn_123",
        "latInput": "37.7749",
        "lngInput": "-122.4194"
      }
    }
  },
  "created_at": 1782485813
}
```

### Common Events
* `checkout.created` / `checkout.updated`: When a checkout starts or changes.
* `order.paid`: Triggered when an order is successfully completed. This is the main entry point for fulfillment automation workflows.
* `subscription.created` / `subscription.updated` / `subscription.cancelled`: Subscription lifecycle events.

---

## Common API Operations & Examples

### 1. Retrieve a Checkout
Checkouts contain line items and metadata collected from custom checkout form fields (like coordinate inputs, parcel APNs, and WordPress user IDs).
* **Endpoint**: `GET /v1/checkouts/{id}`
* **cURL Example**:
  ```bash
  curl -X GET https://api.surecart.com/v1/checkouts/0613fb30-8a9d-47ee-aa1e-7f44cc6a523d \
    -H "Authorization: Bearer YOUR_SURECART_API_KEY"
  ```

### 2. Create a Checkout
* **Endpoint**: `POST /v1/checkouts`
* **cURL Example**:
  ```bash
  curl -X POST https://api.surecart.com/v1/checkouts \
    -H "Authorization: Bearer YOUR_SURECART_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "checkout": {
        "email": "customer@example.com",
        "line_items": [
          {
            "price": "price_123456789",
            "quantity": 1
          }
        ],
        "metadata": {
          "custom_ref": "ref_9988"
        }
      }
    }'
  ```

### 3. Manage Order Notes (Notes API)
SureCart supports adding notes to orders to store fulfillment data, metadata, or custom download links. This is especially useful for digital downloads that are custom generated per order.
* **Endpoint**: `GET`, `POST`, `PATCH` to `/v1/notes`
* **Query Params for GET**: `?notable_id=order_123&notable_type=order`
* **Payload Example (Create)**:
  ```json
  {
    "note": {
      "body": "Your custom files are ready for download.",
      "notable_id": "order_12345",
      "notable_type": "order",
      "metadata": {
        "Download Link": "https://link.example.com/xyz"
      }
    }
  }
  ```

---

## WordPress Integration (Actions & Filters)

SureCart integrates with WordPress to allow custom pricing formats, theme overrides, template alterations, and user enrollment.

### Key Customer Concept
When a checkout is paid, SureCart automatically handles user enrollment:
* A WP user is created/matched for the buyer with the role `sc_customer`.
* WordPress authentication cookies are used to keep track of logged-in sessions.
* Use `get_current_user_id()` inside fulfillment templates to fetch user graphics safely:
  ```php
  $current_user_id = get_current_user_id();
  if ($current_user_id === 0) {
      auth_redirect();
      exit;
  }
  ```

### Intercepting Hooks
You can add filters and actions in `functions.php` or custom plugins:
* `surecart/checkout/paid`: Action run when a checkout is completed.
* `surecart/purchase/created`: Triggered when a customer receives access to a product.
