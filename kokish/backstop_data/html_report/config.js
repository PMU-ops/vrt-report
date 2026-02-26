report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Homepage_0_document_0_desktop.png",
        "test": "../bitmaps_test/20260226-104533/backstop_default_Homepage_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_Homepage_0_document_0_desktop.png",
        "label": "Homepage",
        "requireSameDimensions": false,
        "misMatchThreshold": 0.1,
        "url": "https://kokishriver.com/?cb=1772073934923622",
        "referenceUrl": "https://autopilot-kokish-river.pantheonsite.io/?cb=1772073934923622",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 0.3720766193490632,
          "misMatchPercentage": "0.37",
          "analysisTime": 252
        },
        "diffImage": "../bitmaps_test/20260226-104533/failed_diff_backstop_default_Homepage_0_document_0_desktop.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Environment_0_document_0_desktop.png",
        "test": "../bitmaps_test/20260226-104533/backstop_default_Environment_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_Environment_0_document_0_desktop.png",
        "label": "Environment",
        "requireSameDimensions": false,
        "misMatchThreshold": 0.1,
        "url": "https://kokishriver.com/environment/?cb=1772073934929172",
        "referenceUrl": "https://autopilot-kokish-river.pantheonsite.io/environment/?cb=1772073934929172",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 0.005171989622472714,
          "misMatchPercentage": "0.01",
          "analysisTime": 171
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Contact_Us_0_document_0_desktop.png",
        "test": "../bitmaps_test/20260226-104533/backstop_default_Contact_Us_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_Contact_Us_0_document_0_desktop.png",
        "label": "Contact Us",
        "requireSameDimensions": false,
        "misMatchThreshold": 0.1,
        "url": "https://kokishriver.com/contact-us/?cb=1772073934917377",
        "referenceUrl": "https://autopilot-kokish-river.pantheonsite.io/contact-us/?cb=1772073934917377",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 0.02914951989026063,
          "misMatchPercentage": "0.03",
          "analysisTime": 128
        }
      },
      "status": "pass"
    }
  ],
  "id": "backstop_default"
});