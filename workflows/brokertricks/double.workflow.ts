import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : double
// Nodes   : 30  |  Connections: 29
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// HttpRequest                        httpRequest
// EditFields                         set
// EditFields9                        set
// EditFields1                        set
// KmlGenerator                       code
// UploadKmlToS3                      s3                         [creds]
// HttpRequest2                       httpRequest
// HttpRequest3                       httpRequest                [creds]
// Compression                        compression
// CodeInJavascript                   code
// UploadAFile                        s3                         [creds]
// EditFields2                        set
// StickyNote2                        stickyNote
// EditFields3                        set
// PrepareConfiguration               code
// StaticMapUrlBuilder                set
// GeometryToStaticMapUrlPath         code
// GetElevation                       httpRequest
// Webhook                            executeWorkflowTrigger
// GetFulfillments                    httpRequest                [creds]
// ShortenEditorUrl                   httpRequest
// BackupEditorUrl                    httpRequest                [creds]
// Ntfy                               httpRequest
// RespondToWebhook                   respondToWebhook
// DispatchAWorkflowEventAndWaitForCompletion github                     [creds]
// EditFields4                        set
// Switch_                            switch
// EditFields5                        set
// EditFields6                        set
// EditFields7                        set
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// Webhook
//    → GetFulfillments
//      → GetElevation
//        → EditFields
//          → EditFields9
//            → GeometryToStaticMapUrlPath
//              → StaticMapUrlBuilder
//                → EditFields1
//                  → KmlGenerator
//                    → UploadKmlToS3
//                      → Switch_
//                        → EditFields7
//                          → EditFields4
//                            → DispatchAWorkflowEventAndWaitForCompletion
//                              → HttpRequest2
//                                → HttpRequest3
//                                  → Compression
//                                    → CodeInJavascript
//                                      → UploadAFile
//                                        → EditFields3
//                                          → EditFields2
//                                            → PrepareConfiguration
//                                              → ShortenEditorUrl
//                                                → BackupEditorUrl
//                                                  → Ntfy
//                                                    → RespondToWebhook
//                       .out(1) → EditFields6
//                          → EditFields4 (↩ loop)
//                       .out(2) → EditFields5
//                          → EditFields4 (↩ loop)
// </workflow-map>

// =====================================================================
// WORKFLOW METADATA
// =====================================================================

@workflow({
    id: 'Tqh6g1yqvcfi5qeF',
    name: 'double',
    active: true,
    description:
        "this workflow produces an overhead, north facing view as well as a static map with labels for the editor's  reference and the boundary kml file. the kml is widely accepted in map software and can be used to create the images as a fallback.",
    isArchived: false,
    settings: {
        executionOrder: 'v1',
        availableInMCP: false,
        callerPolicy: 'workflowsFromSameOwner',
        binaryMode: 'separate',
    },
})
export class DoubleWorkflow {
    // =====================================================================
    // NODE CONFIGURATION
    // =====================================================================

    @node({
        id: '79bdc4a0-a87c-4ab8-ae34-74434bc5c188',
        name: 'HTTP Request',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [-3152, -48],
    })
    HttpRequest = {
        url: 'https://auto.brokertricks.com/webhook/ungrid',
        options: {},
    };

    @node({
        id: '2f3d72fa-6b0e-4bfb-9099-cc93c4caecea',
        name: 'Edit Fields',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-2480, 368],
    })
    EditFields = {
        assignments: {
            assignments: [
                {
                    id: '411ea856-ca12-4349-9313-e3c087580f43',
                    name: 'ap parcel number',
                    value: "={{ $('Webhook').item.json.body.payload.parcel_apn }}",
                    type: 'string',
                },
                {
                    id: '2f2f92f2-3a15-4405-a5a6-e192f98bad73',
                    name: 'centroid',
                    value: "={{ $('Webhook').item.json.body.payload.centroid }}",
                    type: 'string',
                },
                {
                    id: '211a05ff-4ba4-465b-96c8-2355925a86cc',
                    name: 'lat',
                    value: "={{ $('Webhook').item.json.body.payload.latitude }}",
                    type: 'string',
                },
                {
                    id: '0957b2c4-2d14-4a22-b3d6-b38b8ba4182c',
                    name: 'lon',
                    value: "={{ $('Webhook').item.json.body.payload.longitude }}",
                    type: 'string',
                },
                {
                    id: 'f421ae78-f1a1-4e76-a374-ecc15170c676',
                    name: 'acres',
                    value: "={{ $('Webhook').item.json.body.payload.acres }}",
                    type: 'number',
                },
                {
                    id: '4c435da0-704e-4e80-9a11-89349464e6c2',
                    name: 'geometry',
                    value: "={{ $('Webhook').item.json.body.payload.geometry }}",
                    type: 'object',
                },
                {
                    id: '57c40033-7331-4897-b3c4-2589c8422c62',
                    name: 'county',
                    value: "={{ $('Webhook').item.json.body.payload.county }}",
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
                    value: "=cust_{{ $('Webhook').item.json.body.payload.wpuser_id }}",
                    type: 'string',
                },
                {
                    id: '9c19d833-5884-4467-bb5f-ab1f7a435c5f',
                    name: 'order_id',
                    value: "order_{{ $('Webhook').item.json.body.payload.order_id }}",
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
        position: [-2256, 368],
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
                    id: 'fbffd5dc-6e53-4038-a1b1-9d53ccc9986c',
                    name: 'owner',
                    value: "={{ $if($input['edit fields'].item.json.owner, $isEmpty(),$('HTTP Request').item.json.fields.primaryownername ) }}",
                    type: 'string',
                },
                {
                    id: 'dd033ec8-237e-4e04-9004-623914baa468',
                    name: 'acres',
                    value: '=',
                    type: 'number',
                },
            ],
        },
        options: {
            dotNotation: true,
        },
    };

    @node({
        id: 'ec788af8-ac25-4272-876d-c34b80a7518d',
        name: 'Edit Fields1',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-1584, 368],
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
                    id: '86c320a1-3e81-4e96-8028-c2b360c911af',
                    name: 'owner',
                    value: "={{ $('Edit Fields9').item.json.owner }}",
                    type: 'string',
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
        position: [-1360, 368],
    })
    KmlGenerator = {
        jsCode: `for (const item of $input.all()) {
  const coords = item.json.geometry.coordinates[0];
  const kmlCoords = coords.map(c => \`\${c[0]},\${c[1]},0\`).join(' ');

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

  const kmlContent = \`<?xml version="1.0" encoding="UTF-8"?>
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

  item.binary = item.binary || {};
  item.binary.kml_data = {
    data: Buffer.from(kmlContent).toString('base64'),
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
        position: [-1136, 368],
        credentials: { s3: { id: '1GusURtMq14SbO6K', name: 'btx-store-bucket' } },
    })
    UploadKmlToS3 = {
        operation: 'upload',
        bucketName: 'btx-store',
        fileName: '{{ $json.customer_id }}/order_{{ $json.order_id }}/parcel_boundary.kml',
        binaryPropertyName: 'kml_data',
        additionalFields: {},
    };

    @node({
        id: '60e090b9-7a6c-471d-a390-08d100de8cd5',
        name: 'HTTP Request2',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.4,
        position: [-16, 368],
    })
    HttpRequest2 = {
        url: '=https://api.github.com/repos/ditchallaway/robotic-property-photographer/actions/runs/{{ $json.run_id }}/artifacts',
        options: {},
    };

    @node({
        id: 'cbc90dc4-efc4-4a4c-a695-1e46ab845263',
        name: 'HTTP Request3',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.4,
        position: [208, 368],
        credentials: { githubApi: { id: 'WAVhETF4rbadk9yF', name: 'GitHub account' } },
    })
    HttpRequest3 = {
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
        position: [432, 368],
    })
    Compression = {
        outputPrefix: '=',
    };

    @node({
        id: 'b286f6f0-4d55-4996-830b-9ed917aa1a5e',
        name: 'Code in JavaScript',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [656, 368],
    })
    CodeInJavascript = {
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
        name: 'Upload a file',
        type: 'n8n-nodes-base.s3',
        version: 1,
        position: [880, 368],
        credentials: { s3: { id: '1GusURtMq14SbO6K', name: 'btx-store-bucket' } },
    })
    UploadAFile = {
        operation: 'upload',
        bucketName: 'btx-store',
        fileName: 'cust_{{ $json.wpuser_id }}/order_{{ $json.order_id }}/{{ $json.fileName }}',
        additionalFields: {},
    };

    @node({
        id: '59bce36f-c5d7-4d7e-84c3-fe535c1f1925',
        name: 'Edit Fields2',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [1328, 368],
    })
    EditFields2 = {
        assignments: {
            assignments: [
                {
                    id: 'e0230557-51e0-480a-902e-a7db19187952',
                    name: 'customer_id',
                    value: "={{ $('Edit Fields9').item.json.customer_id }}",
                    type: 'string',
                },
                {
                    id: '645ef0e8-eba0-40f0-a5d0-4cb73b2514ed',
                    name: 'order_id',
                    value: "={{ $('Edit Fields9').item.json.order_id }}",
                    type: 'string',
                },
                {
                    id: '010529f8-ad41-4e80-ad97-837021971818',
                    name: 'product_id',
                    value: 'full',
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
        position: [-3200, -160],
    })
    StickyNote2 = {
        content: `## 🚩Replace Me
**Replace** With actual api endpoint`,
        height: 272,
        width: 192,
        color: '#477D40',
    };

    @node({
        id: '1510e24a-b6e6-4fdb-8971-8294f439774b',
        name: 'Edit Fields3',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [1104, 368],
    })
    EditFields3 = {
        assignments: {
            assignments: [
                {
                    id: 'd596049d-c49b-4128-a169-e36e268497ce',
                    name: 'imageUrl',
                    value: "=https://pics.brokertricks.com/{{ $('Edit Fields9').item.json.customer_id }}/{{ $('Edit Fields9').item.json.order_id }}/{{ $('Code in JavaScript').item.json.fileName }}",
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '86111bf4-e49e-43e8-962d-f759220c0b3c',
        name: 'Prepare Configuration',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [1552, 368],
    })
    PrepareConfiguration = {
        jsCode: `const items = $input.all();
const input = items[0].json;

const customer_id = input.customer_id || 'cust_12345';
const order_id = input.order_id || 'order_12345';

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
  'pack=overhead_north',
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
        id: '19371f71-914a-42ce-b31c-aabcf1b40d41',
        name: 'static map url builder',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-1808, 368],
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
        id: 'dcebec96-dd08-44c0-8e2b-8c0ba0922058',
        name: 'geometry to static map url path',
        type: 'n8n-nodes-base.code',
        version: 2,
        position: [-2032, 368],
    })
    GeometryToStaticMapUrlPath = {
        jsCode: `// Input JSON containing the geometry and coordinates
const input = items[0].json;
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
        id: '42b264ed-cfde-448c-b248-99c978fb4932',
        name: 'get elevation',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [-2704, 368],
    })
    GetElevation = {
        url: '=https://maps.googleapis.com/maps/api/elevation/json?locations={{ $json.body.payload.latitude }},{{ $json.body.payload.longitude }}&key={{ $env.GOOGLE_API_KEY }}',
        options: {},
    };

    @node({
        id: 'c18aeb34-3a96-4274-b6ae-49b264a2b156',
        name: 'Webhook',
        type: 'n8n-nodes-base.executeWorkflowTrigger',
        version: 1.1,
        position: [-3152, 368],
    })
    Webhook = {
        inputSource: 'passthrough',
    };

    @node({
        id: '236b28b7-6be0-44cb-b44c-00c7e296711d',
        name: 'Get Fulfillments',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [-2928, 368],
        credentials: {
            httpBearerAuth: { id: 'fs3UN7UYgrHE4ads', name: 'surecart' },
            httpHeaderAuth: { id: 'WqEyKDhHJUyfY0Iz', name: 'surecart' },
        },
    })
    GetFulfillments = {
        url: '=https://api.surecart.com/v1/fulfillments?order={{ $("Webhook").item.json.order_id || $("Webhook").item.json.body.payload.order_id }}',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        options: {},
    };

    @node({
        id: 'ab3c7a2b-4e5f-6a7b-8c9d-0e1f2a3b4c5d',
        name: 'Shorten Editor URL',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.4,
        position: [1776, 368],
    })
    ShortenEditorUrl = {
        method: 'POST',
        url: 'https://link.brokertricks.com/api/link/create',
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
        name: 'Backup Editor URL',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [2000, 368],
        credentials: { httpBearerAuth: { id: 'fs3UN7UYgrHE4ads', name: 'surecart' } },
    })
    BackupEditorUrl = {
        method: 'PATCH',
        url: '=https://api.surecart.com/v1/orders/{{ $("Prepare Configuration").item.json.order_id }}',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={
  "metadata": {
    "photopea_editor_url": "{{ $json.shortLink }}"
  }
}`,
        options: {},
    };

    @node({
        id: '5d9f65d1-bcde-4f11-b222-6c8a2f0d8b3c',
        name: 'Ntfy',
        type: 'n8n-nodes-base.httpRequest',
        version: 4.3,
        position: [2224, 368],
    })
    Ntfy = {
        method: 'POST',
        url: 'https://ntfy.sh/brokertricks_alerts',
        sendHeaders: true,
        headerParameters: {
            parameters: [
                {
                    name: 'Click',
                    value: '={{ $("Shorten Editor URL").item.json.shortLink }}',
                },
                {
                    name: 'Markdown',
                    value: 'yes',
                },
            ],
        },
        sendBody: true,
        specifyBody: 'string',
        body: `Render ready for review.

Photopea Link: 
{{ $("Shorten Editor URL").item.json.shortLink }}

Order Dashboard: 
https://brokertricks.com/wp-admin/admin.php?page=surecart-orders&id={{ $("Prepare Configuration").item.json.order_id }}`,
        options: {},
    };

    @node({
        id: '9fc5d717-c41f-43b4-95aa-dd024b1a1a51',
        name: 'Respond to Webhook',
        type: 'n8n-nodes-base.respondToWebhook',
        version: 1.5,
        position: [2448, 368],
    })
    RespondToWebhook = {
        respondWith: 'json',
        responseBody: `={
  "status": "success",
  "order": "order_{{ $('Webhook').item.json.body.payload.order_id }}",
"wp_user": "{{ $('Webhook').item.json.body.payload.wpuser_id }}",
"editor_url": "{{ $('Shorten Editor URL').item.json.shortLink }}"
} `,
        options: {},
    };

    @node({
        id: 'a6a31e34-0005-4b27-ab9a-4e7cfec67a4f',
        webhookId: 'a0aa7f23-74a9-4f95-8851-101a391b1f0c',
        name: 'Dispatch a workflow event and wait for completion',
        type: 'n8n-nodes-base.github',
        version: 1.1,
        position: [-240, 368],
        credentials: { githubApi: { id: 'WAVhETF4rbadk9yF', name: 'GitHub account' } },
    })
    DispatchAWorkflowEventAndWaitForCompletion = {
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
  "snapshot_mode": $('Edit Fields5').item.json["snapshot mode"], 
  "resumeUrl": $resumeUrl 
}) }}`,
    };

    @node({
        id: '2b1a9b63-b1f1-4453-8032-27ec424d83a0',
        name: 'Edit Fields4',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-464, 368],
    })
    EditFields4 = {
        assignments: {
            assignments: [
                {
                    id: '2ef215e0-b03e-4633-8bb3-f50868a1f235',
                    name: 'geometry',
                    value: "={{ $('Webhook').item.json.geometry }}",
                    type: 'object',
                },
                {
                    id: 'bc3bcc7b-f963-427e-8735-8fc551287b4a',
                    name: 'centroid',
                    value: "={{ $('Webhook').item.json.centroid }}",
                    type: 'string',
                },
                {
                    id: '0b2f5d4c-7155-4bb8-8498-cb0ac19dc4a8',
                    name: 'snapshot mode',
                    value: '={{ $json["snapshot mode"] }}',
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '506b9163-1bd6-484d-b913-7f433dbd95e5',
        name: 'Switch',
        type: 'n8n-nodes-base.switch',
        version: 3.3,
        position: [-912, 352],
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
                            version: 2,
                        },
                        conditions: [
                            {
                                leftValue: "={{ $('Webhook').item.json.pid }}",
                                rightValue: ' bb3c33ae-36bc-488d-809e-166665ad7fe6',
                                operator: {
                                    type: 'string',
                                    operation: 'equals',
                                },
                                id: '656adc4d-1f78-4445-bebe-b6cd65b2b531',
                            },
                        ],
                        combinator: 'and',
                    },
                    renameOutput: true,
                    outputKey: 'single',
                },
                {
                    conditions: {
                        options: {
                            caseSensitive: true,
                            leftValue: '',
                            typeValidation: 'strict',
                            version: 2,
                        },
                        conditions: [
                            {
                                id: 'a7615221-b164-40cb-9df2-0540db1fdc75',
                                leftValue: "={{ $('Webhook').item.json.pid }}",
                                rightValue: '69e6ffdb-d671-4309-a9d9-78fdef6d958a',
                                operator: {
                                    type: 'string',
                                    operation: 'equals',
                                    name: 'filter.operator.equals',
                                },
                            },
                        ],
                        combinator: 'and',
                    },
                    renameOutput: true,
                    outputKey: 'double',
                },
                {
                    conditions: {
                        options: {
                            caseSensitive: true,
                            leftValue: '',
                            typeValidation: 'strict',
                            version: 2,
                        },
                        conditions: [
                            {
                                id: '6911a445-1c99-401e-9e79-121a5226a192',
                                leftValue: "={{ $('Webhook').item.json.pid }}",
                                rightValue: 'd082d9a3-90d3-41e3-8b6a-53e8b4572cf6',
                                operator: {
                                    type: 'string',
                                    operation: 'equals',
                                },
                            },
                        ],
                        combinator: 'and',
                    },
                    renameOutput: true,
                    outputKey: 'full',
                },
            ],
        },
        options: {},
    };

    @node({
        id: 'fe3fa110-9a99-42ed-aeaf-b93d42c070bc',
        name: 'Edit Fields5',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-688, 560],
    })
    EditFields5 = {
        assignments: {
            assignments: [
                {
                    id: '00002fba-02a4-462c-811d-265defc8a549',
                    name: 'snapshot mode',
                    value: 'full',
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '3e6d7000-51a7-44e2-8591-00073f0cef02',
        name: 'Edit Fields6',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-688, 368],
    })
    EditFields6 = {
        assignments: {
            assignments: [
                {
                    id: '2c8a5574-8c39-4d85-9259-eed68a123952',
                    name: 'snapshot mode',
                    value: 'double',
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    @node({
        id: '8d3f923d-045c-459d-9ccc-abbda01d2d42',
        name: 'Edit Fields7',
        type: 'n8n-nodes-base.set',
        version: 3.4,
        position: [-688, 176],
    })
    EditFields7 = {
        assignments: {
            assignments: [
                {
                    id: '9fcae74e-f9e5-43a7-ad26-9cbb7420d9f0',
                    name: 'snapshot mode',
                    value: 'single',
                    type: 'string',
                },
            ],
        },
        options: {},
    };

    // =====================================================================
    // ROUTING AND CONNECTIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.EditFields.out(0).to(this.EditFields9.in(0));
        this.EditFields9.out(0).to(this.GeometryToStaticMapUrlPath.in(0));
        this.EditFields1.out(0).to(this.KmlGenerator.in(0));
        this.KmlGenerator.out(0).to(this.UploadKmlToS3.in(0));
        this.UploadKmlToS3.out(0).to(this.Switch_.in(0));
        this.HttpRequest2.out(0).to(this.HttpRequest3.in(0));
        this.HttpRequest3.out(0).to(this.Compression.in(0));
        this.Compression.out(0).to(this.CodeInJavascript.in(0));
        this.CodeInJavascript.out(0).to(this.UploadAFile.in(0));
        this.UploadAFile.out(0).to(this.EditFields3.in(0));
        this.EditFields2.out(0).to(this.PrepareConfiguration.in(0));
        this.EditFields3.out(0).to(this.EditFields2.in(0));
        this.StaticMapUrlBuilder.out(0).to(this.EditFields1.in(0));
        this.GeometryToStaticMapUrlPath.out(0).to(this.StaticMapUrlBuilder.in(0));
        this.GetElevation.out(0).to(this.EditFields.in(0));
        this.Webhook.out(0).to(this.GetFulfillments.in(0));
        this.GetFulfillments.out(0).to(this.GetElevation.in(0));
        this.PrepareConfiguration.out(0).to(this.ShortenEditorUrl.in(0));
        this.ShortenEditorUrl.out(0).to(this.BackupEditorUrl.in(0));
        this.BackupEditorUrl.out(0).to(this.Ntfy.in(0));
        this.Ntfy.out(0).to(this.RespondToWebhook.in(0));
        this.EditFields4.out(0).to(this.DispatchAWorkflowEventAndWaitForCompletion.in(0));
        this.Switch_.out(0).to(this.EditFields7.in(0));
        this.Switch_.out(1).to(this.EditFields6.in(0));
        this.Switch_.out(2).to(this.EditFields5.in(0));
        this.EditFields5.out(0).to(this.EditFields4.in(0));
        this.EditFields6.out(0).to(this.EditFields4.in(0));
        this.EditFields7.out(0).to(this.EditFields4.in(0));
        this.DispatchAWorkflowEventAndWaitForCompletion.out(0).to(this.HttpRequest2.in(0));
    }
}
