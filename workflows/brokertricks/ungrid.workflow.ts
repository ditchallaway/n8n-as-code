import { workflow, node, links } from '@n8n-as-code/transformer';

// <workflow-map>
// Workflow : ungrid
// Nodes   : 2  |  Connections: 1
//
// NODE INDEX
// ──────────────────────────────────────────────────────────────────
// Property name                    Node type (short)         Flags
// RespondToWebhook                   respondToWebhook
// Ungrid                             webhook
//
// ROUTING MAP
// ──────────────────────────────────────────────────────────────────
// Ungrid
//    → RespondToWebhook
// </workflow-map>

// =====================================================================
// METADATA DU WORKFLOW
// =====================================================================

@workflow({
    id: 'vqGcJP0eXH0hG5yo',
    name: 'ungrid',
    active: true,
    isArchived: false,
    projectId: 'SxZfT7rxAv9cKdRm',
    settings: { executionOrder: 'v1' },
})
export class UngridWorkflow {
    // =====================================================================
    // CONFIGURATION DES NOEUDS
    // =====================================================================

    @node({
        id: '846bb95c-f867-48b7-9f49-86c980e202d5',
        name: 'Respond to Webhook',
        type: 'n8n-nodes-base.respondToWebhook',
        version: 1.4,
        position: [208, 0],
    })
    RespondToWebhook = {
        respondWith: 'json',
        responseBody: `{
    "id": 30160,
    "headline": "1117 Shingle Mill Rd",
    "fields": {
        "parcelnumb": "RP58N01W327600A",
        "owner": "",
        "address": "1117 SHINGLE MILL RD",
        "scity": "SANDPOINT",
        "szip": "83864-7475",
        "alt_parcelnumb1": "RP58N01W327600",
        "usecode": "131",
        "usedesc": "Land-ag/timb w/resid Imp",
        "zoning": "A/F-10",
        "zoning_description": "Agricultural And Forestry 10",
        "zoning_type": "Mixed",
        "zoning_subtype": "Mixed Use",
        "zoning_code_link": "https://www.zoneomics.com/code/bonner-county-unincorporated-ID",
        "zoning_id": 14478542,
        "structstyle": "11 One Story",
        "parvaltype": "ASSESSED",
        "improvval": 322909.0,
        "landval": 246942.0,
        "parval": 569851.0,
        "taxamt": 1882.88,
        "owner2": null,
        "owner3": null,
        "szip5": "83864",
        "legaldesc": "32-58N-1W S 396 FT OF TAX 6",
        "neighborhood_code": "1405",
        "lat": "48.332259",
        "lon": "-116.486948",
        "census_tract": "16017950202",
        "census_block": "160179502022045",
        "census_blockgroup": "160179502022",
        "census_zcta": "83864",
        "census_unified_school_district": "Lake Pend Oreille School District 84",
        "recrdareano": 1728,
        "gisacre": 6.5,
        "plss_township": "058N",
        "plss_section": "Section 32",
        "plss_range": "001W",
        "pin": "RP58N01W327600A",
        "owner1": "Kisting, Warren V \\u0026 Maria T",
        "parcels_owner2": null,
        "taxcdarea": "210000",
        "lastasmvalue": 547272.0,
        "lglacres": 6.5,
        "deed1": "563162 WD",
        "deed2": "522253 DEC",
        "deed3": "395420 WD",
        "deed4": "522804 WD",
        "deed5": "501348 DC",
        "deed1gis": "563162",
        "deed2gis": "522804",
        "deed3gis": "395420",
        "deed4gis": "501348",
        "deed5gis": "522253",
        "parcelstatus": "A",
        "primaryownername": "KISTING, WARREN V \\u0026 MARIA T",
        "secondaryownername": null,
        "taxcodearea": "210000",
        "cybillnum": "43344",
        "exemptionsgranted": 125000.0,
        "netassessedvalue": 444851.0,
        "personalpropertyvalue": 0.0,
        "categories": "06,10H,31H,32",
        "totalbasearea": 1728,
        "bsmtfinishedarea": 0,
        "mainfinishedarea": 1728,
        "upperfinishedarea": 0,
        "atticbasearea": 0,
        "atticfinishedarea": 0,
        "garbasearea": 864,
        "cpbasearea": 0,
        "reviewyear": 2021,
        "ll_uuid": "bf4eb8b0-b6d0-4ac0-8aa5-74c0bf7bc376",
        "ll_gisacre": 6.1944,
        "area_building": 1728,
        "area_building_definition": "FINISHED AREA",
        "last_ownership_transfer_date": null,
        "ll_gissqft": 269834,
        "mailadd": null,
        "mail_city": null,
        "mail_state2": null,
        "mail_zip": null,
        "num_bath": 2.0,
        "num_bath_partial": null,
        "num_bedrooms": 2,
        "qoz": "No",
        "qoz_tract": null,
        "year_built_effective_date": 1992,
        "formatted_mailing_address": null
    },
    "key": {
        "parcelnumb": "Parcel ID",
        "owner": "Owner Name (Assessor)",
        "address": "Parcel Address",
        "scity": "Parcel Address City",
        "szip": "Parcel Address Zip Code",
        "alt_parcelnumb1": "First Alternative Parcel ID",
        "usecode": "Parcel Use Code",
        "usedesc": "Parcel Use Description",
        "zoning_type": "Zoning Type",
        "zoning_subtype": "Zoning Subtype",
        "zoning_code_link": "Zoning Code Link",
        "zoning_id": "Zoning Area ID",
        "homestead_exemption": "Homestead Exemption",
        "ll_address_count": "Regrid Calculated Total Address Count",
        "fema_flood_zone": "FEMA Flood Zone",
        "fema_flood_zone_subtype": "FEMA Flood Zone Subtype",
        "fema_flood_zone_raw": "FEMA Flood Zone Raw Data",
        "fema_flood_zone_data_date": "FEMA Flood Zone Data Date",
        "fema_nri_risk_rating": "FEMA NRI Risk Rating",
        "census_elementary_school_district": "Census Provided Elementary School District",
        "census_secondary_school_district": "Census Provided Secondary School District",
        "census_unified_school_district": "Census Provided Unified School District",
        "ll_bldg_footprint_sqft": "Regrid Calculated Building Footprint Square Feet",
        "ll_bldg_count": "Regrid Calculated Building Count",
        "cdl_raw": "Cropland Data Layer Raw Values",
        "cdl_majority_category": "Cropland Data Layer Majority Category",
        "cdl_majority_percent": "Cropland Data Layer Majority Percent",
        "cdl_date": "Cropland Data Layer Date",
        "insite_score": "InSite Score",
        "ll_row_parcel": "Regrid Right-of-Way Parcel Flag",
        "precisely_id": "Precisely ID",
        "placekey": "Placekey",
        "dpv_status": "USPS Delivery Point Validation",
        "dpv_codes": "Delivery Point Validation Codes",
        "dpv_notes": "Delivery Point Validation Notes",
        "dpv_type": "Delivery Point Match Type",
        "cass_errorno": "CASS Error Codes",
        "rdi": "Residential Delivery Indicator",
        "usps_vacancy": "USPS Vacancy Indicator",
        "usps_vacancy_date": "USPS Vacancy Indicator Date",
        "padus_public_access": "PAD-US Public Access Designation",
        "lbcs_activity": "Land Use Code: Activity",
        "lbcs_activity_desc": "Land Use Code Description: Activity",
        "lbcs_function": "Land Use Code: Function",
        "lbcs_function_desc": "Land Use Code Description: Function",
        "lbcs_structure": "Land Use Code: Structure",
        "lbcs_structure_desc": "Land Use Code Description: Structure",
        "lbcs_site": "Land Use Code: Site",
        "lbcs_site_desc": "Land Use Code Description: Site",
        "lbcs_ownership": "Land Use Code: Ownership",
        "lbcs_ownership_desc": "Land Use Code Description: Ownership",
        "housing_affordability_index": "Housing Affordability Index",
        "population_density": "Population Density",
        "population_growth_past_5_years": "Population Growth (CAGR) past 5 years",
        "population_growth_next_5_years": "Population Growth (CAGR) next 5 years",
        "housing_growth_past_5_years": "Housing Units Growth (CAGR) past 5 years",
        "housing_growth_next_5_years": "Housing Units Growth (CAGR) next 5 years",
        "household_income_growth_next_5_years": "Median Household Income Growth (CAGR) next 5 years",
        "median_household_income": "Median Household Income (current year)",
        "transmission_line_distance": "Distance to Transmission line",
        "roughness_rating": "Roughness Rating",
        "highest_parcel_elevation": "Highest Parcel Elevation",
        "lowest_parcel_elevation": "Lowest Parcel Elevation",
        "zoning": "Zoning Code",
        "zoning_description": "Zoning Description",
        "structstyle": "Structure Style",
        "parvaltype": "Parcel Value Type",
        "improvval": "Improvement Value",
        "landval": "Land Value",
        "parval": "Total Parcel Value",
        "taxamt": "Annual Tax Bill",
        "owner2": "Second Owner Name",
        "owner3": "Third Owner Name",
        "szip5": "5 Digit Parcel Zip Code",
        "legaldesc": "Legal Description",
        "neighborhood_code": "Neighborhood Code",
        "lat": "Latitude",
        "lon": "Longitude",
        "census_tract": "Census 2020 Tract",
        "census_block": "Census 2020 Block",
        "census_blockgroup": "Census 2020 Blockgroup",
        "census_zcta": "Census Zip Code Tabulation Area",
        "recrdareano": "Total Square Footage of Structures",
        "gisacre": "County-Provided Acres",
        "plss_township": "PLSS Township",
        "plss_section": "PLSS Section",
        "plss_range": "PLSS Range",
        "pin": "Pin",
        "owner1": "Owner 1",
        "parcels_owner2": "Parcels Owner 2",
        "taxcdarea": "Tax Code Area",
        "lastasmvalue": "Lastasmvalue",
        "lglacres": "Legal Acres",
        "deed1": "Deed 1",
        "deed2": "Deed 2",
        "deed3": "Deed 3",
        "deed4": "Deed 4",
        "deed5": "Deed 5",
        "deed1gis": "Deed 1 GIS",
        "deed2gis": "Deed 2 GIS",
        "deed3gis": "Deed 3 GIS",
        "deed4gis": "Deed 4 GIS",
        "deed5gis": "Deed 5 GIS",
        "parcelstatus": "Parcel Status",
        "primaryownername": "Primary Owner Name",
        "secondaryownername": "Secondary Owner Name",
        "taxcodearea": "Tax Code Area",
        "cybillnum": "Current Year Bill Number",
        "exemptionsgranted": "Exemptions Granted",
        "netassessedvalue": "Net Assessed Value",
        "personalpropertyvalue": "Personal Property Value",
        "categories": "Categories",
        "totalbasearea": "Total Base Area",
        "bsmtfinishedarea": "Basement Finished Area",
        "mainfinishedarea": "Main Finished Area",
        "upperfinishedarea": "Upper Finished Area",
        "atticbasearea": "Attic Base Area",
        "atticfinishedarea": "Attic Finished Area",
        "garbasearea": "Garage Base Area",
        "cpbasearea": "Carport Base Area",
        "reviewyear": "Review Year",
        "ll_uuid": "Regrid UUID",
        "ll_gisacre": "Calculated Acres",
        "area_building": "Building Area",
        "area_building_definition": "Area Building Definition",
        "last_ownership_transfer_date": "Last Ownership Transfer Date",
        "ll_gissqft": "Calculated Parcel Sq Ft",
        "mailadd": "Mailing Address",
        "mail_city": "Mailing Address City",
        "mail_state2": "Mailing Address State",
        "mail_zip": "Mailing Address ZIP Code",
        "num_bath": "Number of Baths",
        "num_bath_partial": "Number of Partial Baths",
        "num_bedrooms": "Number of Bedrooms",
        "qoz": "Federal Qualified Opportunity Zone",
        "qoz_tract": "Qualified Opportunity Zone Tract Number",
        "year_built_effective_date": "Year Built Effective Date",
        "eo_owner": "Enhanced Owner",
        "eo_deedowner": "Deeded Owner",
        "formatted_mailing_address": "Mailing Address"
    },
    "has_premium": true,
    "premium_field_metadata": {
        "zoning_type": {
            "type": "text",
            "human": "Zoning Type",
            "description": "Standardized zoning type",
            "examples": [
                "Residential"
            ],
            "tier": "premium",
            "categories": [
                "premium",
                "zoning"
            ],
            "exists": true
        },
        "zoning_subtype": {
            "type": "text",
            "human": "Zoning Subtype",
            "description": "Standardized zoning subtype",
            "examples": [
                "Single-family"
            ],
            "tier": "premium",
            "categories": [
                "premium",
                "zoning"
            ],
            "exists": true
        },
        "zoning_code_link": {
            "type": "text",
            "human": "Zoning Code Link",
            "description": "Link to the municipality's zoning code",
            "examples": [
                "https://www.zoneomics.com/code/anchorage-AK/chapter_10"
            ],
            "tier": "premium",
            "categories": [
                "premium",
                "zoning"
            ],
            "exists": true
        },
        "zoning_id": {
            "type": "integer",
            "human": "Zoning Area ID",
            "description": "ID for the zoning area for matching to the Regrid zoning product",
            "examples": [
                5555
            ],
            "tier": "premium",
            "categories": [
                "premium",
                "zoning"
            ],
            "exists": true
        },
        "ll_address_count": {
            "type": "integer",
            "human": "Regrid Calculated Total Address Count",
            "description": "Total number of primary and secondary addresses on the parcel as calculated by Regrid",
            "tier": "premium",
            "categories": [
                "calculated",
                "premium"
            ],
            "exists": true
        },
        "fema_nri_risk_rating": {
            "type": "text",
            "human": "FEMA NRI Risk Rating",
            "description": "Sourced from FEMA's National Risk Index; the Risk Rating leverages available source data for natural hazard and community risk factors to develop a baseline relative risk measurement for each U.S. Census tract for all 50 states, the District of Columbia (DC), American Samoa (AS), Commonwealth of the Northern Mariana Islands (MP), Guam (GU), Puerto Rico (PR), and the U.S. Virgin Islands (VI). The National Risk Rating is intended to help users better understand the natural hazard risk of their communities by providing a category range from “Very Low” to “Very High.”",
            "examples": null,
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "census_unified_school_district": {
            "type": "text",
            "human": "Census Provided Unified School District",
            "tier": "premium",
            "categories": [
                "premium",
                "census"
            ],
            "exists": true
        },
        "ll_bldg_footprint_sqft": {
            "type": "integer",
            "human": "Regrid Calculated Building Footprint Square Feet",
            "description": "Total building footprint in square feet as calculated by Regrid",
            "tier": "premium",
            "categories": [
                "calculated",
                "bldg",
                "premium"
            ],
            "exists": true
        },
        "ll_bldg_count": {
            "type": "integer",
            "human": "Regrid Calculated Building Count",
            "description": "Total number of buildings on the parcel as calculated by Regrid",
            "tier": "premium",
            "categories": [
                "calculated",
                "bldg",
                "premium"
            ],
            "exists": true
        },
        "insite_score": {
            "type": "text",
            "human": "InSite Score",
            "description": "NatureServe InSite Score, an integrated biodiversity value score",
            "examples": [
                "Very High",
                "High",
                "Moderate",
                "Low"
            ],
            "tier": "premium",
            "categories": [
                "calculated",
                "premium"
            ],
            "exists": true
        },
        "precisely_id": {
            "type": "text",
            "human": "Precisely ID",
            "description": "The PreciselyID represents a point addressable location. If a location has multiple alias addresses (alias street names, vanity city names, etc), it will receive the same PreciselyID.",
            "examples": null,
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "placekey": {
            "type": "text",
            "default": null,
            "human": "Placekey",
            "examples": [
                "227-223@5vg-82n-pgk"
            ],
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "dpv_status": {
            "type": "text",
            "human": "USPS Delivery Point Validation",
            "examples": [
                "V",
                "N"
            ],
            "tier": "premium",
            "categories": [
                "usps",
                "premium"
            ],
            "exists": true
        },
        "dpv_codes": {
            "type": "text",
            "human": "Delivery Point Validation Codes",
            "tier": "premium",
            "categories": [
                "usps",
                "premium"
            ],
            "exists": true
        },
        "dpv_notes": {
            "type": "text",
            "human": "Delivery Point Validation Notes",
            "tier": "premium",
            "categories": [
                "usps",
                "premium"
            ],
            "exists": true
        },
        "dpv_type": {
            "type": "text",
            "human": "Delivery Point Match Type",
            "examples": [
                "H (High Rise)",
                "S (Street)"
            ],
            "tier": "premium",
            "categories": [
                "usps",
                "premium"
            ],
            "exists": true
        },
        "cass_errorno": {
            "type": "text",
            "human": "CASS Error Codes",
            "tier": "premium",
            "categories": [
                "usps",
                "premium"
            ],
            "exists": true
        },
        "rdi": {
            "type": "text",
            "human": "Residential Delivery Indicator",
            "examples": [
                "Y",
                "N"
            ],
            "tier": "premium",
            "categories": [
                "usps",
                "premium"
            ],
            "exists": true
        },
        "usps_vacancy": {
            "type": "text",
            "human": "USPS Vacancy Indicator",
            "examples": [
                "Y"
            ],
            "tier": "premium",
            "categories": [
                "usps",
                "premium"
            ],
            "exists": true
        },
        "usps_vacancy_date": {
            "type": "date",
            "human": "USPS Vacancy Indicator Date",
            "description": "Date the vacancy indicator was collected",
            "tier": "premium",
            "categories": [
                "usps",
                "premium"
            ],
            "exists": true
        },
        "lbcs_activity": {
            "type": "numeric",
            "human": "Land Use Code: Activity",
            "description": "Actual activity on land, eg farming, shopping, manufacturing.",
            "link": "https://support.regrid.com/articles/lbcs-keys/",
            "tier": "premium",
            "categories": [
                "lbcs",
                "premium",
                "set_during_synthesize"
            ],
            "exists": true
        },
        "lbcs_activity_desc": {
            "type": "text",
            "human": "Land Use Code Description: Activity",
            "description": "Description of the LBCS numeric code",
            "link": "https://support.regrid.com/articles/lbcs-keys/",
            "tier": "premium",
            "categories": [
                "lbcs",
                "premium",
                "set_during_synthesize"
            ],
            "exists": true
        },
        "lbcs_function": {
            "type": "numeric",
            "human": "Land Use Code: Function",
            "description": "Economic function or type of establishment, eg agricultural, commercial, industrial",
            "link": "https://support.regrid.com/articles/lbcs-keys/",
            "tier": "premium",
            "categories": [
                "lbcs",
                "premium",
                "set_during_synthesize"
            ],
            "exists": true
        },
        "lbcs_function_desc": {
            "type": "text",
            "human": "Land Use Code Description: Function",
            "description": "Economic function or type of establishment, eg agricultural, commercial, industrial",
            "link": "https://support.regrid.com/articles/lbcs-keys/",
            "tier": "premium",
            "categories": [
                "lbcs",
                "premium",
                "set_during_synthesize"
            ],
            "exists": true
        },
        "lbcs_structure": {
            "type": "numeric",
            "human": "Land Use Code: Structure",
            "description": "Type of structure or building, eg single-family house, office building, warehouse",
            "link": "https://support.regrid.com/articles/lbcs-keys/",
            "tier": "premium",
            "categories": [
                "lbcs",
                "premium",
                "set_during_synthesize"
            ],
            "exists": true
        },
        "lbcs_structure_desc": {
            "type": "text",
            "human": "Land Use Code Description: Structure",
            "description": "Type of structure or building, eg single-family house, office building, warehouse",
            "link": "https://support.regrid.com/articles/lbcs-keys/",
            "tier": "premium",
            "categories": [
                "lbcs",
                "premium",
                "set_during_synthesize"
            ],
            "exists": true
        },
        "lbcs_site": {
            "type": "numeric",
            "human": "Land Use Code: Site",
            "description": "What is on the land",
            "link": "https://support.regrid.com/articles/lbcs-keys/",
            "tier": "premium",
            "categories": [
                "lbcs",
                "premium",
                "set_during_synthesize"
            ],
            "exists": true
        },
        "lbcs_site_desc": {
            "type": "text",
            "human": "Land Use Code Description: Site",
            "description": "What is on the land",
            "link": "https://support.regrid.com/articles/lbcs-keys/",
            "tier": "premium",
            "categories": [
                "lbcs",
                "premium",
                "set_during_synthesize"
            ],
            "exists": true
        },
        "lbcs_ownership": {
            "type": "numeric",
            "human": "Land Use Code: Ownership",
            "description": "Ownership structure, eg public, private",
            "link": "https://support.regrid.com/articles/lbcs-keys/",
            "tier": "premium",
            "categories": [
                "lbcs",
                "premium"
            ],
            "exists": true
        },
        "lbcs_ownership_desc": {
            "type": "text",
            "human": "Land Use Code Description: Ownership",
            "description": "Ownership structure, eg public, private",
            "link": "https://support.regrid.com/articles/lbcs-keys/",
            "tier": "premium",
            "categories": [
                "lbcs",
                "premium"
            ],
            "exists": true
        },
        "housing_affordability_index": {
            "type": "numeric",
            "human": "Housing Affordability Index",
            "description": "Housing Affordability Index (HAI) measures the ability of a typical resident to purchase a home in the geographic area. The HAI has a base of 100, representing where the median income is sufficient to qualify for a loan on a median-valued home and not be cost-burdened (cost-burdened=greater than 30% of income spent on housing). HAI values \\u003e 100 indicate increasing affordability; HAI values \\u003c 100 indicate areas where homes are less affordable and median income might be insufficient to purchase a median-valued home. This attribute is calculated at the Census Block Group in which the parcel is located. Source US Census Bureau via Esri. Updated each July representing previous year.",
            "examples": null,
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "population_density": {
            "type": "numeric",
            "human": "Population Density",
            "description": "Estimate of the Population Density (population per Square Mile) in the geographic area. Population density is computed by dividing the total population within the geographic area by the total land area, measured in square miles. This attribute is calculated at the Census Block Group in which the parcel is located. Source US Census Bureau via Esri. Updated each July representing previous year.",
            "examples": null,
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "population_growth_past_5_years": {
            "type": "numeric",
            "human": "Population Growth (CAGR) past 5 years",
            "description": "Population Compound Annual Growth Rate (CAGR) for the previous 5 year period, is an annualized measure describing the direction (either positive or negative) and magnitude of change in the total number of persons between the previous 5 years. Annualized means that the resultant value reflects a rate of change over a twelve-month time period. This permits analysis of multiple growth rates between values measured at differing points in time using a common time period of twelve months; the annualized growth rate is repeated, or compounded, each year. The CAGR is sometimes referred to as growth rate, annual rate, annualized growth rate, or compound growth rate. This attribute is calculated at the Census Block Group in which the parcel is located. Source US Census Bureau via Esri. Updated each July representing previous year.",
            "examples": null,
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "population_growth_next_5_years": {
            "type": "numeric",
            "human": "Population Growth (CAGR) next 5 years",
            "description": "Five-year forecast for Population Growth, Compound Annual Growth Rate (CAGR). The Population Growth CAGR is an annualized measure that describes the direction (either positive or negative) and magnitude of change in population between the current year and that year plus 5. The CAGR is sometimes referred to as growth rate, annual rate, annualized growth rate, or compound growth rate. This attribute is calculated at the Census Block Group in which the parcel is located. Source US Census Bureau via Esri. Updated each July representing previous year.",
            "examples": null,
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "housing_growth_past_5_years": {
            "type": "numeric",
            "human": "Housing Units Growth (CAGR) past 5 years",
            "description": "Housing Units Compound Annual Growth Rate (CAGR) for the previous five year period, is an annualized measure describing the direction (either positive or negative) and magnitude of change in the total number of housing units between the previous 5 years. Annualized means that the resultant value reflects a rate of change over a twelve-month time period. This permits analysis of multiple growth rates between values measured at differing points in time using a common time period of twelve months; the annualized growth rate is repeated, or compounded, each year. The CAGR is sometimes referred to as growth rate, annual rate, annualized growth rate, or compound growth rate. This attribute is calculated at the Census Block Group in which the parcel is located. Source US Census Bureau via Esri. Updated each July representing previous year.",
            "examples": null,
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "housing_growth_next_5_years": {
            "type": "numeric",
            "human": "Housing Units Growth (CAGR) next 5 years",
            "description": "Five-year forecast for Housing Units Compound Annual Growth Rate (CAGR). The Housing Unit CAGR is an annualized measure that describes the direction (either positive or negative) and magnitude of change in total housing units between the current year and that year plus 5. The CAGR is sometimes referred to as growth rate, annual rate, annualized growth rate, or compound growth rate. This attribute is calculated at the Census Block Group in which the parcel is located. Source US Census Bureau via Esri. Updated each July representing previous year.",
            "examples": null,
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "household_income_growth_next_5_years": {
            "type": "numeric",
            "human": "Median Household Income Growth (CAGR) next 5 years",
            "description": "Five-year forecast for Median Household Income Compound Annual Growth Rate (CAGR). The Median Household Income CAGR is an annualized measure that describes the direction (either positive or negative) and magnitude of change in the total Median Household Income between the current year and that year plus 5. The CAGR is sometimes referred to as growth rate, annual rate, annualized growth rate, or compound growth rate. This attribute is calculated at the Census Block Group in which the parcel is located. Source US Census Bureau via Esri. Updated each July representing previous year.",
            "examples": null,
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "median_household_income": {
            "type": "numeric",
            "human": "Median Household Income (current year)",
            "description": "Estimate of Median Household Income in the geographic area for the previous year. Median Household Income is the amount that divides household income (annual income for all household earners age 15+) into two equal groups in a geographic area; half of the population will have income higher than the median and half will have lower income. If the median falls in the upper income interval of $200,000+, it is represented by the value of $200,001. Esri uses the U.S. Census definition of income. This attribute is calculated at the Census Block Group in which the parcel is located. Source US Census Bureau via Esri. Updated each July representing previous year.",
            "examples": null,
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "transmission_line_distance": {
            "type": "numeric",
            "human": "Distance to Transmission line",
            "description": "Sourced from HIFLD; provides the distance from the parcel boundary to the nearest relatively high voltage (69kv - 765kv) electric transmission line as available within the Homeland Infrastructure Foundation-Level Data (HIFLD) Transmission Line dataset",
            "examples": null,
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "roughness_rating": {
            "type": "numeric",
            "human": "Roughness Rating",
            "description": "The amount of elevation variability within a parcel. Calculated per parcel from Digital Elevation Model (DEM). 0-80m is considered to represent a level terrain surface; 81-116m represents a nearly level surface; 117-161m represents a slightly rugged surface; 162-239m represents an intermediately rugged surface; 240-497m represents a moderately rugged surface; 498-958m represents a highly rugged surface; 959-4367m represents an extremely rugged surface.",
            "examples": null,
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "highest_parcel_elevation": {
            "type": "numeric",
            "human": "Highest Parcel Elevation",
            "description": "Highest elevation value (meters) intersecting the parcel calculated using best available terrain data. Calculated for each parcel.",
            "examples": null,
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "lowest_parcel_elevation": {
            "type": "numeric",
            "human": "Lowest Parcel Elevation",
            "description": "Lowest elevation value (meters) intersecting the parcel calculated using best available terrain data. Calculated for each parcel.",
            "examples": null,
            "tier": "premium",
            "categories": [
                "premium"
            ],
            "exists": true
        },
        "eo_owner": {
            "type": "text",
            "human": "Enhanced Owner",
            "tier": "premium",
            "categories": [
                "owner",
                "premium"
            ],
            "exists": true
        },
        "eo_deedowner": {
            "type": "text",
            "human": "Deeded Owner",
            "tier": "team",
            "categories": [
                "owner",
                "premium",
                "team"
            ],
            "exists": true
        },
        "owner": {
            "type": "text",
            "human": "Owner Name",
            "tier": "basic",
            "categories": [
                "basic",
                "assessor_data",
                "owner_address",
                "pii",
                "manually_mapped",
                "set_during_synthesize",
                "starter"
            ],
            "exists": true
        }
    },
    "anon_field_metadata": {
        "owner": {
            "type": "text",
            "human": "Owner Name",
            "tier": "basic",
            "categories": [
                "basic",
                "assessor_data",
                "owner_address",
                "pii",
                "manually_mapped",
                "set_during_synthesize",
                "starter"
            ],
            "exists": true
        }
    },
    "reference_links": {
        "lbcs_activity": "https://support.regrid.com/parcel-data/lbcs-keys/",
        "lbcs_function": "https://support.regrid.com/parcel-data/lbcs-keys/",
        "lbcs_ownership": "https://support.regrid.com/parcel-data/lbcs-keys/",
        "lbcs_structure": "https://support.regrid.com/parcel-data/lbcs-keys/",
        "lbcs_site": "https://support.regrid.com/parcel-data/lbcs-keys/",
        "dpv_status": "https://support.regrid.com/parcel-data/cass-codes/",
        "dpv_codes": "https://support.regrid.com/parcel-data/cass-codes/",
        "dpv_notes": "https://support.regrid.com/parcel-data/cass-codes/",
        "dpv_type": "https://support.regrid.com/parcel-data/cass-codes/",
        "cass_errorno": "https://support.regrid.com/parcel-data/cass-codes/",
        "eo_owner": "https://regrid.com/enhanced-ownership",
        "eo_deedowner": "https://regrid.com/enhanced-ownership",
        "owner": "https://support.regrid.com/parcel-data/schema#owner",
        "usps_vacancy": "/pages/vacancy",
        "usps_vacancy_date": "/pages/vacancy",
        "rdi": "/pages/vacancy",
        "plans_link": "/plans"
    },
    "tooltips": {
        "eo_owner": "Regrid's Enhanced Ownership dataset provides the most current ownership information available.\\n\\u003cbr/\\u003eUpdate frequency for this field is approximately daily; click on this info box to view our full Support documentation.\\n\\u003cbr/\\u003eDue to licensing restrictions, this information can be accessed on our site, but is not available for export.\\n",
        "eo_deedowner": "Part of our Enhanced Ownership dataset, this field shows the owner's name as recorded on the deed.\\n\\u003cbr/\\u003eUpdate frequency for this field is approximately daily; click on this info box to view our full Support documentation.\\n\\u003cbr/\\u003eDue to licensing restrictions, this information can be accessed on our site, but is not available for export.",
        "owner": "The owner name as provided from Regrid's public data sources (generally Assessor), \\u003cbr/\\u003eupdated at the same frequency as the rest of this property's data. Source: Regrid",
        "formatted_mailing_address": "The address where tax and other assessor's communications are sent. \\u003cbr/\\u003ePlease note that this info is the same age as Regrid's \\"Owner Name (Assessor)\\" field, and may not match the Enhanced Owner information.",
        "zoning": "The zoning code as locally designated",
        "zoning_description": "Description of the zoning code.",
        "zoning_type": "Standardized zoning type nationwide, included for Regrid Pro and Team as part of our Premium Parcel Schema dataset.",
        "zoning_subtype": "Standardized zoning subtype nationwide, included for Regrid Pro and Team as part of our Premium Parcel Schema dataset.",
        "zoning_code_link": "Link to the zoning code text, included for Regrid Pro and Team as part of our Premium Parcel Schema dataset.",
        "zoning_id": "Unique ID for this zoning polygon, included for Regrid Pro and Team as part of our Premium Parcel Schema dataset.",
        "placekey": "Universal standard identifier for a physical place. Source: \\u003ca href=\\"https://www.placekey.io/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003ePlacekey\\u003c/a\\u003e",
        "housing_affordability_index": "Housing Affordability Index (HAI) measures the ability of a typical resident to purchase a home in the geographic area. The HAI has a base of 100, representing where the median income is sufficient to qualify for a loan on a median-valued home and not be cost-burdened. HAI values \\u003e 100 indicate increasing affordability; HAI values \\u003c 100 indicate areas where homes are less affordable and median income might be insufficient to purchase a median-valued home. This attribute is calculated at the Census Block Group level. Source: \\u003ca href=\\"https://www.arcgis.com/home/item.html?id=b0b3b31e531e406185f2de4fff596060\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003e ESRI/US Census\\u003c/a\\u003e",
        "population_density": "Estimated number of residents per square mile. Source: \\u003ca href=\\"https://www.arcgis.com/home/item.html?id=b0b3b31e531e406185f2de4fff596060\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003e ESRI/US Census\\u003c/a\\u003e",
        "housing_growth_past_5_years": "The Compound Annual Growth Rate of housing units in this area for the past five years. Calculated at the Census Block Group level. Source: \\u003ca href=\\"https://www.arcgis.com/home/item.html?id=b0b3b31e531e406185f2de4fff596060\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003e ESRI/US Census\\u003c/a\\u003e",
        "housing_growth_next_5_years": "Forecast of the Compound Annual Growth Rate of housing units in this area for the next five years. Calculated at the Census Block Group level. Source: \\u003ca href=\\"https://www.arcgis.com/home/item.html?id=b0b3b31e531e406185f2de4fff596060\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003e ESRI/US Census\\u003c/a\\u003e",
        "population_growth_past_5_years": "The Compound Annual Growth Rate of the population in this area for the past five years. Calculated at the Census Block Group level. Source: \\u003ca href=\\"https://www.arcgis.com/home/item.html?id=b0b3b31e531e406185f2de4fff596060\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003e ESRI/US Census\\u003c/a\\u003e",
        "population_growth_next_5_years": "Forecast of the Compound Annual Growth Rate of the population in this area for the next five years. Calculated at the Census Block Group level. Source: \\u003ca href=\\"https://www.arcgis.com/home/item.html?id=b0b3b31e531e406185f2de4fff596060\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003e ESRI/US Census\\u003c/a\\u003e",
        "household_income_growth_next_5_years": "Forecast of the change in median household income over the next five years. Calculated at the Census Block Group level. Source: \\u003ca href=\\"https://www.arcgis.com/home/item.html?id=b0b3b31e531e406185f2de4fff596060\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003e ESRI/US Census\\u003c/a\\u003e",
        "median_household_income": "Current Median Household Income in this property's Census Block Group. Source: \\u003ca href=\\"https://www.arcgis.com/home/item.html?id=b0b3b31e531e406185f2de4fff596060\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003e ESRI/US Census\\u003c/a\\u003e",
        "deeded_acres": "Acres of this property listed as \\"deeded acres\\" by the County. This number is often the same as, but can sometimes differ from, the acreage as calculated by GIS in the \\"County Provided Acres\\" and \\"Regrid Calculated Acres\\" fields.",
        "neighborhood_code": "Alpha numeric code labeled from the source as a \\"neighborhood code\\".",
        "fema_nri_risk_rating": "National Risk Index data. Incorporates data on natural hazards like flood and fire risk, social vulnerability, and community resilience, into one score which then gets classified into categories ranging from \\"Very High\\" to \\"Very Low\\". Calculated at the Census Block Group level. Source: \\u003ca href=\\"https://hazards.fema.gov/nri/learn-more\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003e ESRI/FEMA\\u003c/a\\u003e",
        "transmission_line_distance": "Distance (in meters) that the property lies from the nearest 'relatively high voltage (69kv - 765kv)' electric transmission line. Source: \\u003ca href=\\"https://hifld-geoplatform.hub.arcgis.com/datasets/geoplatform::transmission-lines/explore\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003e ESRI/Homeland Infrastructure Foundation-Level Data (HIFLD)\\u003c/a\\u003e",
        "highest_parcel_elevation": "The highest elevation present on a parcel reflected in meters above sea level. Source: \\u003ca href=\\"https://data.usgs.gov/datacatalog/data/USGS:3a81321b-c153-416f-98b7-cc8e5f0e17c3\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003e ESRI/USGS\\u003c/a\\u003e",
        "lowest_parcel_elevation": "Lowest Parcel Elevation: The lowest elevation present on a parcel reflected in meters above sea level. Source: \\u003ca href=\\"https://data.usgs.gov/datacatalog/data/USGS:3a81321b-c153-416f-98b7-cc8e5f0e17c3\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003e ESRI/USGS\\u003c/a\\u003e",
        "precisely_id": "PreciselyID represents a point addressable location.  If a location has multiple alias addresses (alias street names, vanity city names, etc), it will receive the same PreciselyID. Source: \\u003ca href=\\"https://www.precisely.com/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003e Precisely\\u003c/a\\u003e",
        "roughness_rating": "The amount of elevation variability within a parcel. Calculated per parcel from Digital Elevation Model (DEM). \\n\\u003cbr/\\u003e0 = a level terrain surface\\u003cbr/\\u003e1 = a nearly level terrain surface\\u003cbr/\\u003e2 = a slightly rugged terrain surface\\u003cbr/\\u003e3 = an intermediately rugged terrain surface\\u003cbr/\\u003e4 = a moderately rugged terrain surface\\u003cbr/\\u003e5 = a highly rugged terrain surface\\u003cbr/\\u003e6 = an extremely rugged terrain surface\\u003cbr/\\u003eSource: \\u003ca href=\\"https://data.usgs.gov/datacatalog/data/USGS:3a81321b-c153-416f-98b7-cc8e5f0e17c3\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\\u003e ESRI/USGS\\u003c/a\\u003e",
        "year_built_effective_date": "Adjusted year built, factoring in condition and / or major structural changes to the building.",
        "last_ownership_transfer_date": "Most recent ownership transfer of any kind. Often the same as the 'Last Sale Date', but can differ if there was a non-arms-length transfer after the most recent sale.",
        "area_building": "Total area in square feet of all structures on the property, which can include; Hallways, Common Areas (Gym, Laundry, Mail, Pool, etc) and any other area determined by the specific county assessor.",
        "area_building_definition": "Details the area described by the AreaBuilding value.",
        "num_bath": "The total number of rooms that are utilized as bathrooms. Count includes full and partial bathrooms.",
        "num_bath_partial": "Total number of rooms that are defined as partial bathrooms by common real estate definition.",
        "num_bedrooms": "Total number of rooms that can be qualified as bedrooms.",
        "insite_score": "Estimated relative biodiversity value based on comprehensive national data, including spatial models. Intended to provide an overview summary of biodiversity assets across a site. Source: \\u003ca href='https://insite.natureserve.org/' target='_blank' rel='noopener noreferrer'\\u003eNatureServe\\u003c/a\\u003e"
    },
    "streetview": "https://app.regrid.com/us/id/bonner/sandpoint/30160/streetside.jpg",
    "birdseye": "https://app.regrid.com/us/id/bonner/sandpoint/30160/birdseye.jpg",
    "spec": {
        "dataset": "sitecontrol",
        "geoid": "16017",
        "city": "sandpoint",
        "id": 30160
    },
    "path": "/us/id/bonner/sandpoint/30160",
    "centroid": [
        -116.4869477327835,
        48.33225928561425
    ],
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [
                    -116.4868255,
                    48.3317135
                ],
                [
                    -116.485553,
                    48.3317135
                ],
                [
                    -116.4855585,
                    48.332807
                ],
                [
                    -116.488335,
                    48.3328055
                ],
                [
                    -116.488341,
                    48.332094
                ],
                [
                    -116.4883485,
                    48.3317135
                ],
                [
                    -116.4868255,
                    48.3317135
                ]
            ]
        ]
    },
    "blexts": [],
    "blext_key": {},
    "bookmarked": false,
    "bookmarks": [],
    "bookmarks_team": [],
    "bookmarks_as_blexts": [],
    "context": [
        {
            "headline": "83864",
            "name": "83864",
            "path": "/us/83864",
            "category": "place"
        },
        {
            "headline": "Census Tract 9502.02",
            "name": "Census Tract 9502.02",
            "path": "/us/tracts/16017950202",
            "category": "place"
        },
        {
            "headline": "Sandpoint, ID",
            "name": "Sandpoint, ID",
            "path": "/us/id/bonner/sandpoint",
            "active": true
        },
        {
            "headline": "Bonner County, ID",
            "name": "Bonner County",
            "path": "/us/id/bonner",
            "active": true,
            "verse_path": "/us/id/bonner"
        },
        {
            "headline": "United States",
            "name": "United States",
            "path": "/us",
            "category": "place"
        }
    ],
    "formatted_addresses": [
        [
            "1117 Shingle Mill Rd",
            "Sandpoint",
            "ID",
            "83864",
            "United States"
        ]
    ],
    "metadata": {
        "headline": "Bonner, ID",
        "table_updated": "February 10, 2026",
        "last_refresh": "January 27, 2026"
    },
    "notices": {},
    "others": [],
    "status": "ok",
    "sources": [],
    "imagery": {
        "allowed": false,
        "remaining": 0,
        "used": 0,
        "need": "register",
        "metered": false
    }
}`,
        options: {},
    };

    @node({
        id: '618590ba-4c20-4d36-9839-99e7252f5a87',
        webhookId: '427c5e88-ddef-44e2-9f34-816a0c744ea3',
        name: 'ungrid',
        type: 'n8n-nodes-base.webhook',
        version: 2.1,
        position: [0, 0],
    })
    Ungrid = {
        path: 'ungrid',
        responseMode: 'responseNode',
        options: {},
    };

    // =====================================================================
    // ROUTAGE ET CONNEXIONS
    // =====================================================================

    @links()
    defineRouting() {
        this.Ungrid.out(0).to(this.RespondToWebhook.in(0));
    }
}
