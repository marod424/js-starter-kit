export const schema = {
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "minItems": 5,
      "maxItems": 5,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "unique": true,
            "minimum": 1,
            "maximum": 100,
          },
          "title": {
            "type": "string",
            "faker": "random.word"
          },
          "description": {
            "type": "string",
            "faker": "random.words",
          },
          "link": {
            "type": "string",
            "faker": "system.commonFileName",
          }
        },
        required: ["id", "title", "description", "link"]
      }
    }
  },
  required: ["items"]
};
