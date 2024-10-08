"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const joi = require("joi");
const envsSchema = joi.object({
    PORT: joi.number().required(),
    POSTGRES_PRISMA_URL: joi.string().required(),
    SECRET_KEY: joi.string().required(),
})
    .unknown(true);
const { error, value } = envsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const envVars = value;
exports.envs = {
    port: envVars.PORT,
    postgres_prisma_url: envVars.POSTGRES_PRISMA_URL,
    secret_key: envVars.SECRET_KEY
};
//# sourceMappingURL=envs.js.map