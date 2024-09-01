"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const path = __importStar(require("path"));
require('dotenv').config();
const database = {
    testing: {
        client: "pg",
        connection: {
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            user: process.env.PGUSER,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
        },
        migrations: {
            directory: path.resolve("./dist/shared/migrations"),
        },
        seeds: {
            directory: path.resolve("./dist/shared/seeds"),
        },
    },
    local: {
        client: "pg",
        connection: {
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            user: process.env.PGUSER,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
        },
        migrations: {
            directory: path.resolve("./src/shared/migrations"),
        },
        seeds: {
            directory: path.resolve("./src/shared/seeds"),
        },
    },
    production: {
        client: "pg",
        connection: {
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            user: process.env.PGUSER,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
        },
        migrations: {
            directory: path.resolve("./dist/shared/migrations"),
        },
        seeds: {
            directory: path.resolve("./dist/shared/seeds"),
        },
        extension: 'js' // Ensure you are using the compiled JS files
    },
};
module.exports = database;
//# sourceMappingURL=knexfile.js.map