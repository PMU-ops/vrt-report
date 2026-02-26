report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Homepage_0_document_0_desktop.png",
        "test": "../bitmaps_test/20260226-105911/backstop_default_Homepage_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_Homepage_0_document_0_desktop.png",
        "label": "Homepage",
        "requireSameDimensions": false,
        "misMatchThreshold": 0.1,
        "url": "https://powellriverenergy.com/?cb=1772074752051388",
        "referenceUrl": "https://autopilot-powell-river.pantheonsite.io/?cb=1772074752051388",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": -43
          },
          "rawMisMatchPercentage": 13.880700890251022,
          "misMatchPercentage": "13.88",
          "analysisTime": 323
        },
        "diffImage": "../bitmaps_test/20260226-105911/failed_diff_backstop_default_Homepage_0_document_0_desktop.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Contact_Us_0_document_0_desktop.png",
        "test": "../bitmaps_test/20260226-105911/backstop_default_Contact_Us_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_Contact_Us_0_document_0_desktop.png",
        "label": "Contact Us",
        "requireSameDimensions": false,
        "misMatchThreshold": 0.1,
        "url": "https://powellriverenergy.com/contact-us/?cb=1772074752045334",
        "referenceUrl": "https://autopilot-powell-river.pantheonsite.io/contact-us/?cb=1772074752045334",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": -2
          },
          "rawMisMatchPercentage": 1.0612068472793783,
          "misMatchPercentage": "1.06",
          "analysisTime": 125
        },
        "diffImage": "../bitmaps_test/20260226-105911/failed_diff_backstop_default_Contact_Us_0_document_0_desktop.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});