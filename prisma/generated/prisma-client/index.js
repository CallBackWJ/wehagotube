"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "TYPE",
    embedded: false
  },
  {
    name: "TimeLink",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://wehago-tube-ce22201688.herokuapp.com/youtube-backend/dev`
});
exports.prisma = new exports.Prisma();
