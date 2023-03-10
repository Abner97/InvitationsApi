export default {
  type: "object",
  properties: {
    id: { type: "string" },
    willGo: { type: "boolean" },
  },
  required: ["willGo", "id"],
} as const;
