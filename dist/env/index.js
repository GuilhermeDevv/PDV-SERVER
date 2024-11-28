"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["dev", "test", "production"]).default("dev"),
    PORT: zod_1.z.coerce.number().default(3000),
});
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.log("❌ invalid environment variables", _env.error.format());
    throw new Error("invalid environment variables.");
}
exports.env = _env.data;
