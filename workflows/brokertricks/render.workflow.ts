import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : render
// Nodes   : 42  |  Connections: 43
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// HttpRequest                        httpRequest
// Webhook                            executeWorkflowTrigger
// GetExpandedOrder                   httpRequest                [creds]
// GetFulfillments                    httpRequest                [creds]
// GetElevation                       httpRequest
// EditFields                         set
// EditFields9                        set
// GeometryToStaticMapUrlPath         code
// StaticMapUrlBuilder                set
// DownloadStaticMap                  httpRequest
// UploadStaticMap                    s3                         [creds]
// EditFields1                        set
// KmlGenerator                       code
// UploadKmlToS3                      s3                         [creds]
// IsSingleMap                        if
// NeedsRender                        if
// AutoFulfill                        httpRequest                [creds]
// NtfyKmlReady                       ntfySend                   [creds]
// DispatchGithubAndWait              github                     [creds]
// GetArtifacts                       httpRequest
// DownloadArtifact                   httpRequest                [creds]
// Compression                        compression
// SplitFiles                         code
// UploadRenderedFile                 s3                         [creds]
// EditFields3                        set
// EditFields2                        set
// StickyNote2                        stickyNote
// IsAutoFulfill                      if
// PrepareConfiguration               code
// ShortenEditorUrl                   httpRequest                [creds]
// CheckForNotes                      httpRequest                [creds]
// If_                                if
// CreateANote                        httpRequest                [creds]
// UpdateNote                         httpRequest                [creds]
// NtfySend                           ntfySend                   [creds]
// PrepareAutoFulfillLinks            code
// ShortenDownloadUrls                httpRequest                [creds]
// CheckForNotesAutofulfill           httpRequest                [creds]
// AggregateLinks                     code
// IfNoteExists                       if
// CreateNoteAutofulfill              httpRequest                [creds]
// UpdateNoteAutofulfill              httpRequest                [creds]
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// Webhook
//    → GetExpandedOrder
//      → GetFulfillments
//        → GetElevation
//          → EditFields
//            → EditFields9
//              → GeometryToStaticMapUrlPath
//                → StaticMapUrlBuilder
//                  → DownloadStaticMap
//                    → UploadStaticMap
//                      → EditFields1
//                        → KmlGenerator
//                          → UploadKmlToS3
//                            → IsSingleMap
//                              → PrepareConfiguration
//                                → ShortenEditorUrl
//                                  → CheckForNotes
//                                    → If_
//                                      → CreateANote
//                                        → NtfySend
//                                     .out(1) → UpdateNote
//                                        → NtfySend (↩ loop)
//                             .out(1) → NeedsRender
//                                → DispatchGithubAndWait
//                                  → GetArtifacts
//                                    → DownloadArtifact
//                                      → Compression
//                                        → SplitFiles
//                                          → UploadRenderedFile
//                                            → EditFields3
//                                              → EditFields2
//                                                → IsAutoFulfill
//                                                  → PrepareAutoFulfillLinks
//                                                    → ShortenDownloadUrls
//                                                      → CheckForNotesAutofulfill
//                                                        → AggregateLinks
//                                                          → IfNoteExists
//                                                            → UpdateNoteAutofulfill
//                                                              → AutoFulfill
//                                                                → NtfyKmlReady
//                                                           .out(1) → CreateNoteAutofulfill
//                                                              → AutoFulfill (↩ loop)
//                                                 .out(1) → PrepareConfiguration (↩ loop)
//                               .out(1) → PrepareAutoFulfillLinks (↩ loop)
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'q0BPuZQQFV0xwgjp',
    name: 'render',
    active: true,
    description:
        'Unified render workflow. Receives snapshot_mode (single, double, full, kml_only) and pack from the new-order controller. Produces static map, KML boundary file, and optionally dispatches GitHub Actions for rendered snapshots. KML-only orders auto-fulfill and skip the snapshot pipeline.',
    isArchived: false,
    settings: { executionOrder: 'v1', availableInMCP: true, callerPolicy: 'workflowsFromSameOwner' },
})
export class RenderWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '79bdc4a0-a87c-4ab8-ae34-74434bc5c188',
        name: 'HTTP Request',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [-3088, -48],
    })
    HttpRequest = {
        url: 'https://auto.brokertricks.com/webhook/ungrid',
        options: {},
    };

    @node({
        id: '8c834ba2-8d44-439c-836e-268fe96a35e8',
        name: 'Webhook',
        type: 'n8n-nodes-base.executeWorkflowTrigger',
        version: 1.1,
        position: [-3088, 368],
    })
    Webhook = {
        inputSource: 'passthrough',
    };

    @node({
        id: '2a1d2b3c-4e5f-6a7b-8c9d-0e1f2a3b4c5d',
        name: 'Get Expanded Order',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [-2864, 368],
        credentials: {
            httpBearerAuth: { id: 'fs3UN7UYgrHE4ads', name: 'surecart' },
            httpHeaderAuth: { id: 'WqEyKDhHJUyfY0Iz', name: 'surecart' },
        },
    })
    GetExpandedOrder = {
        url: '=https://api.surecart.com/v1/orders/{{ $("Webhook").item.json.order_id }}?expand=fulfillments',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        options: {},
    };

    @node({
        id: '236b28b7-6be0-44cb-b44c-00c7e296711d',
        name: 'Get Fulfillments',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [-2640, 368],
        credentials: {
            httpBearerAuth: { id: 'fs3UN7UYgrHE4ads', name: 'surecart' },
            httpHeaderAuth: { id: 'WqEyKDhHJUyfY0Iz', name: 'surecart' },
        },
    })
    GetFulfillments = {
        url: '=https://api.surecart.com/v1/fulfillments?order={{ $("Webhook").item.json.order_id }}',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        options: {},
    };

    @node({
        id: '42b264ed-cfde-448c-b248-99c978fb4932',
        name: 'get elevation',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [-2416, 368],
    })
    GetElevation = {
        url: '=https://maps.googleapis.com/maps/api/elevation/json?locations={{ $("Webhook").item.json.latitude }},{{ $("Webhook").item.json.longitude }}&key={{ $env.GOOGLE_API_KEY }}',
        options: {},
    };

    @node({
        id: '2f3d72fa-6b0e-4bfb-9099-cc93c4caecea',
        name: 'Edit Fields',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-2192, 368],
    })
    EditFields = {
        assignments: {
            assignments: [
                {
                    id: '411ea856-ca12-4349-9313-e3c087580f43',
                    name: 'ap parcel number',
                    value: "={{ $('Webhook').item.json.parcel_apn }}",
                    type: 'string',
                },
                {
                    id: '2f2f92f2-3a15-4405-a5a6-e192f98bad73',
                    name: 'centroid',
                    value: "={{ $('Webhook').item.json.centroid }}",
                    type: 'string',
                },
                {
                    id: '211a05ff-4ba4-465b-96c8-2355925a86cc',
                    name: 'lat',
                    value: "={{ $('Webhook').item.json.latitude }}",
                    type: 'string',
                },
                {
                    id: '0957b2c4-2d14-4a22-b3d6-b38b8ba4182c',
                    name: 'lon',
                    value: "={{ $('Webhook').item.json.longitude }}",
                    type: 'string',
                },
                {
                    id: 'f421ae78-f1a1-4e76-a374-ecc15170c676',
                    name: 'acres',
                    value: "={{ $('Webhook').item.json.acres }}",
                    type: 'number',
                },
                {
                    id: '4c435da0-704e-4e80-9a11-89349464e6c2',
                    name: 'geometry',
                    value: "={{ $('Webhook').item.json.geometry }}",
                    type: 'object',
                },
                {
                    id: '57c40033-7331-4897-b3c4-2589c8422c62',
                    name: 'county',
                    value: "={{ $('Webhook').item.json.county }}",
                    type: 'string',
                },
                {
                    id: 'a78441f2-c1ba-4a04-b602-5daf1947ab24',
                    name: 'elevation',
                    value: '={{ $json.results && $json.results[0] ? $json.results[0].elevation : 100 }}',
                    type: 'number',
                },
                {
                    id: '79de9b5b-743c-4c2e-9a30-b954e9352f5f',
                    name: 'customer_id',
                    value: "={{ $('Webhook').item.json.wpuser_id }}",
                    type: 'string',
                },
                {
                    id: '9c19d833-5884-4467-bb5f-ab1f7a435c5f',
                    name: 'order_id',
                    value: "={{ $('Webhook').item.json.order_id }}",
                    type: 'string',
                },
                {
                    id: '5d2953b1-dd6f-4aad-818a-78154f77609a',
                    name: 'path',
                    value: "=/cust_{{ $('Webhook').item.json.wpuser_id }}/order_{{ $('Webhook').item.json.order_id }}/",
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '8ba9f227-dceb-4d87-9869-8ebd5ea74586',
        name: 'Edit Fields9',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-1968, 368],
    })
    EditFields9 = {
        assignments: {
            assignments: [
                {
                    id: '833f249c-1c9e-4761-a33a-3a3db158b696',
                    name: 'elevation',
                    value: "={{ $('get elevation').item.json.results[0].elevation }}",
                    type: 'number',
                },
                {
                    id: '371329a8-6fc2-40da-a44f-a2e0ecf85799',
                    name: 'lat',
                    value: "={{ $('get elevation').item.json.results[0].location.lat }}",
                    type: 'string',
                },
                {
                    id: 'd9e3c9b4-6d08-4581-93b6-1b71c7196349',
                    name: 'lon',
                    value: "={{ $('get elevation').item.json.results[0].location.lng }}",
                    type: 'string',
                },
                {
                    id: '9cfcc07f-8fd5-4cfa-a27d-6a806c49347b',
                    name: 'county',
                    value: '={{ $json.county }}',
                    type: 'string',
                },
                {
                    id: '99dbf8a6-c1f3-45ed-9455-ea17598b8caf',
                    name: 'customer_id',
                    value: '={{ $json.customer_id }}',
                    type: 'string',
                },
                {
                    id: '47501d91-0e4d-4484-b987-e06c59997b52',
                    name: 'order_id',
                    value: '={{ $json.order_id }}',
                    type: 'string',
                },
                {
                    id: '363501e4-e192-4890-b57f-ab723cc2a53a',
                    name: 'geometry',
                    value: '={{ $json.geometry }}',
                    type: 'object',
                },
                {
                    id: 'dd033ec8-237e-4e04-9004-623914baa468',
                    name: 'acres',
                    value: "={{ $('Edit Fields').item.json.acres }}",
                    type: 'number',
                },
            ],
        },
        options: {
            dotNotation: true,
        },
    };

    @node({
        id: 'dcebec96-dd08-44c0-8e2b-8c0ba0922058',
        name: 'geometry to static map url path',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [-1744, 368],
    })
    GeometryToStaticMapUrlPath = {
        jsCode: `// Input JSON containing the geometry and coordinates
const coordinates = $input.first().json.geometry.coordinates[0];  // Access the first ring of the Polygon

const color = "0xffff00ff";
const weight = 4;

// Helper function to create the path string with rounded numbers
function createPathString(coordinates) {
  return coordinates.map(coord => {
    const lat = Number(coord[1]).toFixed(7); // Convert to number, round to 7 decimals
    const lon = Number(coord[0]).toFixed(7); // Convert to number, round to 7 decimals
    return \`\${lat},\${lon}\`;
  }).join('|');  // Reverse lat/lon
}

// Build the path string
const pathString = \`path=color:\${color}|weight:\${weight}|\${createPathString(coordinates)}\`;

// Return the result
return [{ json: { ...$input.first().json, pathString: pathString } }];`,
    };

    @node({
        id: '19371f71-914a-42ce-b31c-aabcf1b40d41',
        name: 'static map url builder',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-1520, 368],
    })
    StaticMapUrlBuilder = {
        assignments: {
            assignments: [
                {
                    id: 'b687ed80-e00e-4108-b1e9-1d1a378ac748',
                    name: 'srcmap',
                    value: '=https://maps.googleapis.com/maps/api/staticmap?size=1200x1200&scale=2&maptype=hybrid&{{ $json.pathString }}&key={{ $env.GOOGLE_API_KEY }}',
                    type: 'string',
                },
                {
                    id: 'fd464050-4749-47b5-bde9-4ecd7b47ab58',
                    name: 'acres',
                    value: "={{ $('Edit Fields').item.json.acres }}",
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: 'ff139e7d-65bf-43ef-a9dc-dcb240b59379',
        name: 'Download Static Map',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.4,
        position: [-1296, 368],
    })
    DownloadStaticMap = {
        url: '={{ $json.srcmap }}',
        options: {
            response: {
                response: {
                    responseFormat: 'file',
                    outputPropertyName: 'map',
                },
            },
        },
    };

    @node({
        id: 'a7e92441-5b82-4706-a560-f567aae177a3',
        name: 'Upload static map',
        type: 'n8n-nodes-base.s3',
        version: 1,
        position: [-1072, 368],
        credentials: { s3: { id: '1GusURtMq14SbO6K', name: 'btx-store-bucket' } },
    })
    UploadStaticMap = {
        operation: 'upload',
        bucketName: 'btx-store',
        fileName: 'cust_{{ $json.customer_id }}/order_{{ $json.order_id }}/property_map.png',
        binaryPropertyName: 'map',
        additionalFields: {},
    };

    @node({
        id: 'ec788af8-ac25-4272-876d-c34b80a7518d',
        name: 'Edit Fields1',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-848, 368],
    })
    EditFields1 = {
        assignments: {
            assignments: [
                {
                    id: '68a6db1a-891e-48fe-9f8e-52f6b1e92a6e',
                    name: 'acres',
                    value: '={{ $json.acres }}',
                    type: 'number',
                },
                {
                    id: '369090e7-3df2-451b-b0df-8a21951a35e1',
                    name: 'elevation',
                    value: "={{ $('Edit Fields9').item.json.elevation }}",
                    type: 'number',
                },
                {
                    id: 'ccbe62f6-31f1-4c54-bbc8-f5471615c971',
                    name: 'lat',
                    value: "={{ $('Edit Fields9').item.json.lat }}",
                    type: 'number',
                },
                {
                    id: 'cc988a98-9a90-474a-be5b-a1988bddac86',
                    name: 'lon',
                    value: "={{ $('Edit Fields9').item.json.lon }}",
                    type: 'number',
                },
                {
                    id: '98d5ce07-c629-4329-a75e-c1b4a00df470',
                    name: 'county',
                    value: "={{ $('Edit Fields9').item.json.county }}",
                    type: 'string',
                },
                {
                    id: 'ae8a5ec6-c344-4b65-a8bc-f5e4b12223a1',
                    name: 'customer_id',
                    value: "={{ $('Edit Fields9').item.json.customer_id }}",
                    type: 'string',
                },
                {
                    id: '6e88832b-b8a4-440b-b7a0-b5455cb8cad1',
                    name: 'order_id',
                    value: "={{ $('Edit Fields9').item.json.order_id }}",
                    type: 'string',
                },
                {
                    id: '7ef0cb01-ec6b-4b28-916e-bda06b82074b',
                    name: 'geometry',
                    value: "={{ $('Edit Fields9').item.json.geometry }}",
                    type: 'object',
                },
                {
                    id: 'c33cc601-a399-4bfc-b167-6ee2a7677468',
                    name: 'srcmap',
                    value: "={{ $('static map url builder').item.json.srcmap }}",
                    type: 'string',
                },
            ],
        },
        options: {
            dotNotation: true,
        },
    };

    @node({
        id: 'b5c7d03a-3199-4c55-a8cd-6ef5b31f0a2c',
        name: 'KML Generator',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [-624, 368],
    })
    KmlGenerator = {
        jsCode: `for (const item of $input.all()) {
  const kmlContent = item.json.kml || '';
  
  let finalKml = kmlContent;
  if (!finalKml) {
    const coords = item.json.geometry.coordinates[0];
    const kmlCoords = coords.map(c => \`\${c[0]},\${c[1]},0\`).join(' ');
    finalKml = \`<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Parcel Boundary</name>
    <Placemark>
      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>\${kmlCoords}</coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>
    </Placemark>
  </Document>
</kml>\`;
  }

  const coords = item.json.geometry.coordinates[0];
  item.json.boundary = coords.map(c => [Number(c[0]), Number(c[1])]);

  let centroidLon = Number(item.json.lon);
  let centroidLat = Number(item.json.lat);
  
  if (typeof item.json.centroid === 'string' && item.json.centroid.includes(',')) {
    const parts = item.json.centroid.split(',');
    if (parts[0] && parts[0].trim() !== '' && parts[1] && parts[1].trim() !== '') {
      centroidLon = Number(parts[0]);
      centroidLat = Number(parts[1]);
    }
  } else if (Array.isArray(item.json.centroid)) {
    centroidLon = Number(item.json.centroid[0]);
    centroidLat = Number(item.json.centroid[1]);
  } else if (item.json.centroid && typeof item.json.centroid === 'object') {
    if (item.json.centroid.lon !== undefined) centroidLon = Number(item.json.centroid.lon);
    if (item.json.centroid.lat !== undefined) centroidLat = Number(item.json.centroid.lat);
  }
  
  if (isNaN(centroidLon) || isNaN(centroidLat)) {
    centroidLon = Number(item.json.lon);
    centroidLat = Number(item.json.lat);
  }
  
  item.json.centroid = { lon: centroidLon, lat: centroidLat };

  item.binary = item.binary || {};
  item.binary.kml_data = {
    data: Buffer.from(finalKml).toString('base64'),
    mimeType: 'application/vnd.google-earth.kml+xml',
    fileName: 'parcel_boundary.kml',
    fileExtension: 'kml'
  };
}
return $input.all();`,
    };

    @node({
        id: 'f83da59a-1912-4c63-b8e3-05b1c55cf83d',
        name: 'Upload KML to S3',
        type: 'n8n-nodes-base.s3',
        version: 1,
        position: [-400, 368],
        credentials: { s3: { id: '1GusURtMq14SbO6K', name: 'btx-store-bucket' } },
    })
    UploadKmlToS3 = {
        operation: 'upload',
        bucketName: 'btx-store',
        fileName: 'cust_{{ $json.customer_id }}/order_{{ $json.order_id }}/parcel_boundary.kml',
        binaryPropertyName: 'kml_data',
        additionalFields: {},
    };

    @node({
        id: '9b3c4d5e-6a7b-8c9d-0e1f-2a3b4c5d6e7f',
        name: 'Is Single Map',
        type: 'n8n-nodes-base.if',
        version: 2.3,
        position: [-288, 250],
    })
    IsSingleMap = {
        conditions: {
            options: {
                caseSensitive: true,
                typeValidation: 'strict',
                version: 3,
            },
            conditions: [
                {
                    id: 'is-single-map-check',
                    leftValue: "={{ $('Webhook').item.json.snapshot_mode }}",
                    rightValue: 'single_map',
                    operator: {
                        type: 'string',
                        operation: 'equals',
                    },
                },
            ],
            combinator: 'and',
        },
        options: {},
    };

    @node({
        id: 'c4a1b2d3-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
        name: 'Needs Render',
        type: 'n8n-nodes-base.if',
        version: 2.3,
        position: [-176, 368],
    })
    NeedsRender = {
        conditions: {
            options: {
                caseSensitive: true,
                leftValue: '',
                typeValidation: 'strict',
                version: 3,
            },
            conditions: [
                {
                    id: 'needs-render-check',
                    leftValue: "={{ $('Webhook').item.json.snapshot_mode }}",
                    rightValue: 'kml_only',
                    operator: {
                        type: 'string',
                        operation: 'notEqual',
                    },
                },
            ],
            combinator: 'and',
        },
        options: {},
    };

    @node({
        id: 'd5b2c3e4-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
        name: 'Auto Fulfill',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.4,
        position: [48, 176],
        credentials: {
            httpBearerAuth: { id: 'fs3UN7UYgrHE4ads', name: 'surecart' },
            httpHeaderAuth: { id: 'WqEyKDhHJUyfY0Iz', name: 'surecart' },
        },
    })
    AutoFulfill = {
        method: 'PATCH',
        url: "=https://api.surecart.com/v1/fulfillments/{{ $('Get Fulfillments').item.json.data[0].id }}",
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={
  "fulfillment": {
    "shipment_status": "delivered",
    "notifications_enabled": true
  }
}`,
        options: {},
    };

    @node({
        id: 'e6c3d4f5-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
        name: 'Ntfy KML Ready',
        type: 'n8n-nodes-ntfy-client.ntfySend',
        version: 1,
        position: [272, 176],
        credentials: { ntfyApi: { id: 'W2xKUTn1PP43EdnG', name: 'ntfy account' } },
    })
    NtfyKmlReady = {
        topic: 'to-human-bt-test',
        message: `=KML boundary file delivered for order {{ $('Webhook').item.json.order_id }}.

Customer Email: {{ $("Webhook").item.json.email || "N/A" }}

KML Download: https://pics.brokertricks.com/cust_{{ $('Webhook').item.json.wpuser_id }}/order_{{ $('Webhook').item.json.order_id }}/parcel_boundary.kml`,
        title: 'KML-Only Order Fulfilled',
        tags: 'kml-only',
    };

    @node({
        id: 'a7912591-50ce-4f7f-85eb-3f0db9486d46',
        webhookId: 'a0aa7f23-74a9-4f95-8851-101a391b1f0c',
        name: 'Dispatch GitHub and Wait',
        type: 'n8n-nodes-base.github',
        version: 1.1,
        position: [48, 560],
        credentials: { githubApi: { id: 'WAVhETF4rbadk9yF', name: 'GitHub account' } },
    })
    DispatchGithubAndWait = {
        resource: 'workflow',
        operation: 'dispatchAndWait',
        owner: {
            __rl: true,
            value: 'ditchallaway',
            mode: 'list',
            cachedResultName: 'ditchallaway',
            cachedResultUrl: 'https://github.com/ditchallaway',
        },
        repository: {
            __rl: true,
            value: 'Robotic-Property-Photographer',
            mode: 'list',
            cachedResultName: 'Robotic-Property-Photographer',
            cachedResultUrl: 'https://github.com/ditchallaway/Robotic-Property-Photographer',
        },
        workflowId: {
            __rl: true,
            value: 262111778,
            mode: 'list',
            cachedResultName: 'Snapshots',
        },
        ref: {
            __rl: true,
            value: 'main',
            mode: 'list',
            cachedResultName: 'main',
        },
        inputs: `={{ JSON.stringify({
  "job_json": JSON.stringify({
    "lat": parseFloat($('Edit Fields9').first().json.lat), 
    "lon": parseFloat($('Edit Fields9').first().json.lon), 
    "boundary": $('Edit Fields9').first().json.geometry, 
    "acres": parseFloat($('Edit Fields9').first().json.acres), 
    "county": $('Edit Fields9').first().json.county, 
    "elevation": parseFloat($('Edit Fields9').first().json.elevation), 
    "customer_id": $('Edit Fields9').first().json.customer_id, 
    "order_id": $('Edit Fields9').first().json.order_id 
  }), 
  "snapshot_mode": $('Webhook').first().json.snapshot_mode, 
  "resumeUrl": $resumeUrl 
}) }}`,
    };

    @node({
        id: '60e090b9-7a6c-471d-a390-08d100de8cd5',
        name: 'Get Artifacts',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.4,
        position: [272, 560],
    })
    GetArtifacts = {
        url: '=https://api.github.com/repos/ditchallaway/robotic-property-photographer/actions/runs/{{ $json.run_id }}/artifacts',
        options: {},
    };

    @node({
        id: 'cbc90dc4-efc4-4a4c-a695-1e46ab845263',
        name: 'Download Artifact',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.4,
        position: [496, 560],
        credentials: { githubApi: { id: 'WAVhETF4rbadk9yF', name: 'GitHub account' } },
    })
    DownloadArtifact = {
        url: '={{ $json.artifacts[0].archive_download_url }}',
        authentication: 'predefinedCredentialType',
        nodeCredentialType: 'githubApi',
        options: {},
    };

    @node({
        id: 'ed5eb1ed-a379-4064-8644-11da8263ae40',
        name: 'Compression',
        type: 'n8n-nodes-base.compression',
        version: 1.1,
        position: [720, 560],
    })
    Compression = {
        outputPrefix: '=',
    };

    @node({
        id: 'b286f6f0-4d55-4996-830b-9ed917aa1a5e',
        name: 'Split Files',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [944, 560],
    })
    SplitFiles = {
        jsCode: `const items = [];
for (const item of $input.all()) {
  for (const key of Object.keys(item.binary)) {
    items.push({
      json: {
        ...item.json,
        fileName: item.binary[key].fileName
      },
      binary: {
        data: item.binary[key]
      }
    });
  }
}
return items;`,
    };

    @node({
        id: '109cbc83-2967-47db-8947-cbac80d1a449',
        name: 'Upload Rendered File',
        type: 'n8n-nodes-base.s3',
        version: 1,
        position: [1168, 560],
        credentials: { s3: { id: '1GusURtMq14SbO6K', name: 'btx-store-bucket' } },
    })
    UploadRenderedFile = {
        operation: 'upload',
        bucketName: 'btx-store',
        fileName:
            "=cust_{{ $('Webhook').item.json.wpuser_id }}/order_{{ $('Webhook').item.json.order_id }}/{{ $json.fileName }}",
        additionalFields: {},
    };

    @node({
        id: '1510e24a-b6e6-4fdb-8971-8294f439774b',
        name: 'Edit Fields3',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [1392, 560],
    })
    EditFields3 = {
        assignments: {
            assignments: [
                {
                    id: 'd596049d-c49b-4128-a169-e36e268497ce',
                    name: 'imageUrl',
                    value: "=https://pics.brokertricks.com/{{ $('Edit Fields9').item.json.customer_id }}/{{ \"order_\" + $('Edit Fields').item.json.order_id }}/{{ $('Split Files').item.json.fileName }}",
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '59bce36f-c5d7-4d7e-84c3-fe535c1f1925',
        name: 'Edit Fields2',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [1616, 560],
    })
    EditFields2 = {
        assignments: {
            assignments: [
                {
                    id: 'e0230557-51e0-480a-902e-a7db19187952',
                    name: 'customer_id',
                    value: '={{ "cust_" + $(\'Edit Fields9\').item.json.customer_id }}',
                    type: 'string',
                },
                {
                    id: '645ef0e8-eba0-40f0-a5d0-4cb73b2514ed',
                    name: 'order_id',
                    value: '={{ "order_" + $(\'Edit Fields\').item.json.order_id }}',
                    type: 'string',
                },
                {
                    id: '010529f8-ad41-4e80-ad97-837021971818',
                    name: 'product_id',
                    value: "={{ $('Webhook').item.json.snapshot_mode }}",
                    type: 'string',
                },
                {
                    id: 'ad75eb23-304b-4fad-aef6-57be26f05d0c',
                    name: 'acreage',
                    value: "={{ $('Edit Fields1').item.json.acres }}",
                    type: 'number',
                },
                {
                    id: 'fe722463-ee2c-448f-ae8d-e8f6ed6bca48',
                    name: 'imageUrl',
                    value: '={{ $json.imageUrl }}',
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '349d7f61-fea5-400f-8ac3-66d0a3e7790d',
        name: 'Sticky Note2',
        type: 'n8n-nodes-base.stickyNote',
        version: 1,
        position: [-3136, -160],
    })
    StickyNote2 = {
        content: `## 🚩Replace Me
**Replace** With actual api endpoint`,
        height: 272,
        width: 192,
        color: '#477D40',
    };

    @node({
        id: 'new-is-auto-fulfill-node-uuid',
        name: 'Is Auto Fulfill',
        type: 'n8n-nodes-base.if',
        version: 2.3,
        position: [1750, 560],
    })
    IsAutoFulfill = {
        conditions: {
            options: {
                caseSensitive: true,
                typeValidation: 'strict',
                version: 3,
            },
            conditions: [
                {
                    id: 'is-single',
                    leftValue: "={{ $('Webhook').item.json.snapshot_mode }}",
                    rightValue: 'single',
                    operator: {
                        type: 'string',
                        operation: 'equals',
                    },
                },
            ],
            combinator: 'and',
        },
        options: {},
    };

    @node({
        id: '86111bf4-e49e-43e8-962d-f759220c0b3c',
        name: 'Prepare Configuration',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [1840, 560],
    })
    PrepareConfiguration = {
        jsCode: `const items = $input.all();
const input = items[0].json;

const customer_id = input.customer_id || 'cust_12345';
const order_id = input.order_id || 'order_12345';

// Read pack and snapshot_mode from the Webhook input (passed by new-order)
const pack = $('Webhook').first().json.pack || 'overhead_only';
const snapshot_mode = $('Webhook').first().json.snapshot_mode || 'single';

let acreage = 0;
try {
    acreage = $('Edit Fields1').first().json.acres;
} catch(e) {
    acreage = input.acreage || 0;
}

let fulfillment_id = '';
try {
    const fulfillmentsNode = $('Get Fulfillments').first().json;
    const fulfillments = Array.isArray(fulfillmentsNode) ? fulfillmentsNode : (fulfillmentsNode.data || fulfillmentsNode.fulfillments || []);
    fulfillment_id = fulfillments[0]?.id || '';
} catch(e) {
    // fallback if not available
}

const safeOrderId = String(order_id || '');
const formattedOrderId = safeOrderId.startsWith('order_') ? safeOrderId : 'order_' + safeOrderId;

// Build short editor URL — the editor page builds the Photopea config itself
const params = [
  \`customer_id=\${encodeURIComponent(customer_id)}\`,
  \`order_id=\${encodeURIComponent(formattedOrderId)}\`,
  \`pack=\${encodeURIComponent(pack)}\`,
  \`acreage=\${encodeURIComponent(acreage)}\`
];
if (fulfillment_id) {
  params.push(\`fulfillment_id=\${encodeURIComponent(fulfillment_id)}\`);
}

const editorUrl = \`https://app.brokertricks.com/editor/?\${params.join('&')}\`;

// Count images for reference
const files = items.filter(item => item.json.imageUrl).map(item => item.json.imageUrl);

return [{
  json: {
    ...input,
    editorUrl,
    filesIncluded: files.length,
    fulfillment_id
  }
}];`,
    };

    @node({
        id: 'ab3c7a2b-4e5f-6a7b-8c9d-0e1f2a3b4c5d',
        name: 'Shorten Editor URL',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.4,
        position: [2064, 560],
        credentials: { httpBearerAuth: { id: 'Hy4bWHoBR2fWc0wj', name: 'Short link bearer' } },
    })
    ShortenEditorUrl = {
        method: 'POST',
        url: 'https://link.brokertricks.com/api/link/create',
        authentication: 'predefinedCredentialType',
        nodeCredentialType: 'httpBearerAuth',
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'Authorization',
                    value: '=Bearer {{ $env.NUXT_SITE_TOKEN }}',
                },
            ],
        },
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={
  "url": "{{ $json.editorUrl }}",
  "comment": "Editor URL for order_{{ $json.order_id }}"
}`,
        options: {},
    };

    @node({
        id: '3c8e54c0-abcd-4e00-a111-5b7f1e9c7a2b',
        name: 'check for notes',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [2288, 560],
        credentials: {
            httpBearerAuth: { id: 'fs3UN7UYgrHE4ads', name: 'surecart' },
            httpHeaderAuth: { id: 'WqEyKDhHJUyfY0Iz', name: 'surecart' },
        },
    })
    CheckForNotes = {
        url: '=https://api.surecart.com/v1/notes?notable_id={{ $("Prepare Configuration").item.json.order_id }}&notable_type=order',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        options: {},
    };

    @node({
        id: 'e5c53eef-6422-4178-bb05-23eed3a742f7',
        name: 'If',
        type: 'n8n-nodes-base.if',
        version: 2.3,
        position: [2512, 560],
    })
    If_ = {
        conditions: {
            options: {
                caseSensitive: true,
                leftValue: '',
                typeValidation: 'strict',
                version: 3,
            },
            conditions: [
                {
                    id: '52eae219-b7fe-47c3-b5a0-eb1e7282e1ba',
                    leftValue:
                        '={{ !($json.data || []).some(n => (n.metadata && n.metadata["Editor URL"]) || (n.body && n.body.includes("link.brokertricks.com"))) }}',
                    rightValue: '',
                    operator: {
                        type: 'boolean',
                        operation: 'true',
                        singleValue: true,
                    },
                },
            ],
            combinator: 'and',
        },
        options: {},
    };

    @node({
        id: 'c8fcdb81-25de-4c3a-b58e-f9a3a4906128',
        name: 'create a note',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [2736, 464],
        credentials: {
            httpBearerAuth: { id: 'fs3UN7UYgrHE4ads', name: 'surecart' },
            httpHeaderAuth: { id: 'WqEyKDhHJUyfY0Iz', name: 'surecart' },
        },
    })
    CreateANote = {
        method: 'POST',
        url: '=https://api.surecart.com/v1/notes',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'Content-Type',
                    value: 'application/json',
                },
            ],
        },
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={
    "note": {
      "body": {{ JSON.stringify( $('Shorten Editor URL').item.json.shortLink) }},
      "notable_id": {{ JSON.stringify( $('Webhook').item.json.order_id ) }},
      "notable_type": "order",
      "metadata": {"Editor URL": {{JSON.stringify( $('Shorten Editor URL').item.json.shortLink) }}}
            }
}
`,
        options: {},
    };

    @node({
        id: '710aa1b1-d8d5-422e-9a0b-c407194bddce',
        name: 'Update Note',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.4,
        position: [2736, 656],
        credentials: {
            httpBearerAuth: { id: 'fs3UN7UYgrHE4ads', name: 'surecart' },
            httpHeaderAuth: { id: 'WqEyKDhHJUyfY0Iz', name: 'surecart' },
        },
    })
    UpdateNote = {
        method: 'PATCH',
        url: '=https://api.surecart.com/v1/notes/{{ ($json.data || []).find(n => (n.metadata && n.metadata["Editor URL"]) || (n.body && n.body.includes("link.brokertricks.com")))?.id }}',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'Content-Type',
                    value: 'application/json',
                },
            ],
        },
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={
    "note": {
      "body": {{ JSON.stringify( $('Shorten Editor URL').item.json.shortLink) }},
      "notable_id": {{ JSON.stringify( $('Prepare Configuration').item.json.order_id) }},
      "notable_type": "order",
      "metadata": {
"Editor URL": {{JSON.stringify( $('Shorten Editor URL').item.json.shortLink) }}}
            }
}`,
        options: {},
    };

    @node({
        id: '9465ff3b-3e79-4af8-bd31-a39fb13d9cc8',
        name: 'Ntfy Send',
        type: 'n8n-nodes-ntfy-client.ntfySend',
        version: 1,
        position: [2960, 560],
        credentials: { ntfyApi: { id: 'W2xKUTn1PP43EdnG', name: 'ntfy account' } },
    })
    NtfySend = {
        topic: 'to-human-bt-test',
        message: `=Render ready for review.

Customer Email: {{ $("Webhook").item.json.email || "N/A" }}

Editor Link: {{ $("Shorten Editor URL").item.json.shortLink }}

Order Dashboard: https://brokertricks.com/wp-admin/admin.php?page=surecart-orders&id={{ $("Prepare Configuration").item.json.order_id }}`,
        title: 'Render Ready',
        tags: 'new-order',
    };

    @node({
        id: 'new-prepare-links-uuid',
        name: 'Prepare Auto Fulfill Links',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [1900, 200],
    })
    PrepareAutoFulfillLinks = {
        jsCode: `const snapshot_mode = $('Webhook').first().json.snapshot_mode;
const wpuser_id = $('Webhook').first().json.wpuser_id;
const order_id = $('Webhook').first().json.order_id;
const baseUrl = "https://pics.brokertricks.com/cust_" + wpuser_id + "/order_" + order_id + "/";

const links = [];
links.push({ url: baseUrl + "parcel_boundary.kml", key: "kml_url" });
links.push({ url: baseUrl + "property_map.png", key: "map_url" });

if (snapshot_mode === 'single') {
  try {
    const fileName = $('Split Files').first().json.fileName;
    if (fileName) links.push({ url: baseUrl + fileName, key: "overhead_url" });
  } catch(e) {}
}
return [{ json: { links, order_id } }];`,
    };

    @node({
        id: 'new-shorten-uuid',
        name: 'Shorten Download URLs',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.4,
        position: [2100, 200],
        credentials: { httpBearerAuth: { id: 'Hy4bWHoBR2fWc0wj', name: 'Short link bearer' } },
    })
    ShortenDownloadUrls = {
        method: 'POST',
        url: 'https://link.brokertricks.com/api/link/create',
        authentication: 'predefinedCredentialType',
        nodeCredentialType: 'httpBearerAuth',
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'Authorization',
                    value: '=Bearer {{ $env.NUXT_SITE_TOKEN }}',
                },
            ],
        },
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={
  "url": "{{ $json.url }}",
  "comment": "Download URL for order_{{ $('Prepare Auto Fulfill Links').item.json.order_id }}"
}`,
        options: {},
    };

    @node({
        id: 'new-check-notes-uuid',
        name: 'Check For Notes AutoFulfill',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [2300, 200],
        credentials: {
            httpBearerAuth: { id: 'fs3UN7UYgrHE4ads', name: 'surecart' },
            httpHeaderAuth: { id: 'WqEyKDhHJUyfY0Iz', name: 'surecart' },
        },
    })
    CheckForNotesAutofulfill = {
        url: '=https://api.surecart.com/v1/notes?notable_id={{ $("Prepare Auto Fulfill Links").item.json.order_id }}&notable_type=order',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        options: {},
    };

    @node({
        id: 'new-aggregate-uuid',
        name: 'Aggregate Links',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [2500, 200],
    })
    AggregateLinks = {
        jsCode: `const shortLinks = $input.all().map(item => item.json.shortLink);
const originalLinks = $('Prepare Auto Fulfill Links').first().json.links;
const order_id = $('Prepare Auto Fulfill Links').first().json.order_id;
const notesNode = $('Check For Notes AutoFulfill').first().json;
const notes = Array.isArray(notesNode) ? notesNode : (notesNode.data || []);

const metadata = {
  pack: $('Webhook').first().json.pack,
  fulfilled_at: new Date().toISOString()
};

for (let i=0; i<originalLinks.length; i++) {
  metadata[originalLinks[i].key] = shortLinks[i] || originalLinks[i].url;
}

const existingNote = notes.find(n => n.metadata && n.metadata.fulfilled_at);
return [{ json: { metadata, order_id, existing_note_id: existingNote ? existingNote.id : null } }];`,
    };

    @node({
        id: 'new-if-note-uuid',
        name: 'If Note Exists',
        type: 'n8n-nodes-base.if',
        version: 2.3,
        position: [2700, 200],
    })
    IfNoteExists = {
        conditions: {
            options: {
                caseSensitive: true,
                typeValidation: 'strict',
                version: 3,
            },
            conditions: [
                {
                    id: 'has-note',
                    leftValue: '={{ $json.existing_note_id }}',
                    rightValue: '',
                    operator: {
                        type: 'string',
                        operation: 'notEmpty',
                    },
                },
            ],
            combinator: 'and',
        },
        options: {},
    };

    @node({
        id: 'new-create-note-uuid',
        name: 'Create Note AutoFulfill',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [2900, 100],
        credentials: {
            httpBearerAuth: { id: 'fs3UN7UYgrHE4ads', name: 'surecart' },
            httpHeaderAuth: { id: 'WqEyKDhHJUyfY0Iz', name: 'surecart' },
        },
    })
    CreateNoteAutofulfill = {
        method: 'POST',
        url: '=https://api.surecart.com/v1/notes',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'Content-Type',
                    value: 'application/json',
                },
            ],
        },
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={
    "note": {
      "body": "Files ready for download",
      "notable_id": "{{ $json.order_id }}",
      "notable_type": "order",
      "metadata": {{ JSON.stringify($json.metadata) }}
    }
}`,
        options: {},
    };

    @node({
        id: 'new-update-note-uuid',
        name: 'Update Note AutoFulfill',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [2900, 300],
        credentials: {
            httpBearerAuth: { id: 'fs3UN7UYgrHE4ads', name: 'surecart' },
            httpHeaderAuth: { id: 'WqEyKDhHJUyfY0Iz', name: 'surecart' },
        },
    })
    UpdateNoteAutofulfill = {
        method: 'PATCH',
        url: '=https://api.surecart.com/v1/notes/{{ $json.existing_note_id }}',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'Content-Type',
                    value: 'application/json',
                },
            ],
        },
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={
    "note": {
      "body": "Files ready for download (updated)",
      "notable_id": "{{ $json.order_id }}",
      "notable_type": "order",
      "metadata": {{ JSON.stringify($json.metadata) }}
    }
}`,
        options: {},
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.Webhook.out(0).to(this.GetExpandedOrder.in(0));
        this.GetExpandedOrder.out(0).to(this.GetFulfillments.in(0));
        this.GetFulfillments.out(0).to(this.GetElevation.in(0));
        this.GetElevation.out(0).to(this.EditFields.in(0));
        this.EditFields.out(0).to(this.EditFields9.in(0));
        this.EditFields9.out(0).to(this.GeometryToStaticMapUrlPath.in(0));
        this.GeometryToStaticMapUrlPath.out(0).to(this.StaticMapUrlBuilder.in(0));
        this.StaticMapUrlBuilder.out(0).to(this.DownloadStaticMap.in(0));
        this.DownloadStaticMap.out(0).to(this.UploadStaticMap.in(0));
        this.UploadStaticMap.out(0).to(this.EditFields1.in(0));
        this.EditFields1.out(0).to(this.KmlGenerator.in(0));
        this.KmlGenerator.out(0).to(this.UploadKmlToS3.in(0));
        this.UploadKmlToS3.out(0).to(this.IsSingleMap.in(0));
        this.IsSingleMap.out(0).to(this.PrepareConfiguration.in(0));
        this.IsSingleMap.out(1).to(this.NeedsRender.in(0));
        this.NeedsRender.out(0).to(this.DispatchGithubAndWait.in(0));
        this.NeedsRender.out(1).to(this.PrepareAutoFulfillLinks.in(0));
        this.DispatchGithubAndWait.out(0).to(this.GetArtifacts.in(0));
        this.GetArtifacts.out(0).to(this.DownloadArtifact.in(0));
        this.DownloadArtifact.out(0).to(this.Compression.in(0));
        this.Compression.out(0).to(this.SplitFiles.in(0));
        this.SplitFiles.out(0).to(this.UploadRenderedFile.in(0));
        this.UploadRenderedFile.out(0).to(this.EditFields3.in(0));
        this.EditFields3.out(0).to(this.EditFields2.in(0));
        this.EditFields2.out(0).to(this.IsAutoFulfill.in(0));
        this.IsAutoFulfill.out(0).to(this.PrepareAutoFulfillLinks.in(0));
        this.IsAutoFulfill.out(1).to(this.PrepareConfiguration.in(0));
        this.PrepareAutoFulfillLinks.out(0).to(this.ShortenDownloadUrls.in(0));
        this.ShortenDownloadUrls.out(0).to(this.CheckForNotesAutofulfill.in(0));
        this.CheckForNotesAutofulfill.out(0).to(this.AggregateLinks.in(0));
        this.AggregateLinks.out(0).to(this.IfNoteExists.in(0));
        this.IfNoteExists.out(0).to(this.UpdateNoteAutofulfill.in(0));
        this.IfNoteExists.out(1).to(this.CreateNoteAutofulfill.in(0));
        this.UpdateNoteAutofulfill.out(0).to(this.AutoFulfill.in(0));
        this.CreateNoteAutofulfill.out(0).to(this.AutoFulfill.in(0));
        this.AutoFulfill.out(0).to(this.NtfyKmlReady.in(0));
        this.PrepareConfiguration.out(0).to(this.ShortenEditorUrl.in(0));
        this.ShortenEditorUrl.out(0).to(this.CheckForNotes.in(0));
        this.CheckForNotes.out(0).to(this.If_.in(0));
        this.If_.out(0).to(this.CreateANote.in(0));
        this.If_.out(1).to(this.UpdateNote.in(0));
        this.CreateANote.out(0).to(this.NtfySend.in(0));
        this.UpdateNote.out(0).to(this.NtfySend.in(0));
    }
}
