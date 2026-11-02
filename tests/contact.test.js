const { test } = require("node:test");
const assert = require("node:assert/strict");
const valid = { name: "A Client", email: "client@example.com", type: "business", description: "A considered website for a small business.", consent: true };
test("accepts a valid inquiry", async () => { const { validateLead } = await import("../lib/contact-validation.mjs"); assert.deepEqual(validateLead(valid).errors, {}); });
test("rejects missing fields and consent", async () => { const { validateLead } = await import("../lib/contact-validation.mjs"); const { errors } = validateLead({}); for (const key of ["name", "email", "type", "description", "consent"]) assert.ok(errors[key]); });
test("rejects bad email and long descriptions", async () => { const { validateLead } = await import("../lib/contact-validation.mjs"); const { errors } = validateLead({ ...valid, email: "not-an-email", description: "x".repeat(5001) }); assert.equal(errors.email, "email"); assert.equal(errors.description, "long"); });
test("rejects type confusion", async () => { const { validateLead } = await import("../lib/contact-validation.mjs"); assert.ok(validateLead({ ...valid, name: { injected: true } }).errors.name); });
test("normalizes whitespace and language", async () => { const { validateLead } = await import("../lib/contact-validation.mjs"); const { data } = validateLead({ ...valid, name: "  Brian  ", language: "es" }); assert.equal(data.name, "Brian"); assert.equal(data.language, "es"); });
