
    const schema = {
  "asyncapi": "2.5.0",
  "info": {
    "title": "variable-info",
    "description": "Object specification for the description of variables in Verona APIs",
    "license": {
      "name": "CC0 1.0",
      "url": "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    "version": " - click on schema id to expand",
    "contact": {
      "name": "Home of verona-interfaces (German only)",
      "url": "https://verona-interfaces.github.io/"
    }
  },
  "channels": {
    "iqb_data_structures": {
      "subscribe": {
        "operationId": "Please select one schema",
        "message": {
          "messageId": "select_schema",
          "x-parser-message-name": "select_schema"
        }
      }
    }
  },
  "components": {
    "schemas": {
      "response": {
        "$id": "variable-info@verona@1.3",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "variable info for coding",
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "pattern": "^[0-9a-zA-Z_]+$",
            "description": "Identifier for the variable",
            "x-parser-schema-id": "<anonymous-schema-1>"
          },
          "alias": {
            "type": "string",
            "pattern": "^[0-9a-zA-Z_]+$",
            "description": "Alternative identifier for the variable",
            "x-parser-schema-id": "<anonymous-schema-2>"
          },
          "type": {
            "type": "string",
            "enum": [
              "string",
              "integer",
              "number",
              "boolean",
              "attachment",
              "json",
              "no-value",
              "coded"
            ],
            "description": "Data type of the variable value",
            "x-parser-schema-id": "<anonymous-schema-3>"
          },
          "format": {
            "type": "string",
            "enum": [
              "text-selection",
              "image",
              "capture-image",
              "audio",
              "ggb-file",
              "non-negative",
              "latex",
              "math-ml",
              "math-table",
              "math-text-mix",
              "ggb-variable",
              ""
            ],
            "description": "Data type format",
            "x-parser-schema-id": "<anonymous-schema-4>"
          },
          "multiple": {
            "type": "boolean",
            "default": false,
            "description": "Can the value be of type Array?",
            "x-parser-schema-id": "<anonymous-schema-5>"
          },
          "nullable": {
            "type": "boolean",
            "default": false,
            "description": "Can the value be null?",
            "x-parser-schema-id": "<anonymous-schema-6>"
          },
          "values": {
            "type": "array",
            "description": "List of possible values",
            "items": {
              "type": "object",
              "properties": {
                "value": {
                  "type": [
                    "string",
                    "number",
                    "boolean"
                  ],
                  "x-parser-schema-id": "<anonymous-schema-9>"
                },
                "label": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-10>"
                }
              },
              "additionalProperties": false,
              "required": [
                "value"
              ],
              "x-parser-schema-id": "<anonymous-schema-8>"
            },
            "x-parser-schema-id": "<anonymous-schema-7>"
          },
          "valuePositionLabels": {
            "type": "array",
            "description": "Labels of the positions if the value is of type array",
            "items": {
              "type": "string",
              "x-parser-schema-id": "<anonymous-schema-12>"
            },
            "x-parser-schema-id": "<anonymous-schema-11>"
          },
          "valuesComplete": {
            "type": "boolean",
            "default": false,
            "description": "Are the given values all possible values?",
            "x-parser-schema-id": "<anonymous-schema-13>"
          },
          "page": {
            "type": "string",
            "description": "Page of the unit, on which the variable is located.",
            "x-parser-schema-id": "<anonymous-schema-14>"
          }
        },
        "additionalProperties": false,
        "required": [
          "id",
          "type"
        ],
        "x-parser-schema-id": "variable-info@verona@1.3"
      }
    }
  },
  "x-parser-spec-parsed": true,
  "x-parser-api-version": 3,
  "x-parser-spec-stringified": true
};
    const config = {"show":{"sidebar":false},"sidebar":{"showOperations":"byDefault"},"showOperations":false};
    const appRoot = document.getElementById('root');
    AsyncApiStandalone.render(
        { schema, config, }, appRoot
    );
  