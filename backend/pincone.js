import { Pinecone } from "@pinecone-database/pinecone";
require("dotenv").config();
const api_key = process.env.pinecone_api_key;

const pc = new Pinecone({
  apiKey: `${api_key}`,
});

const indexName = "movies";

await pc.createIndex({
  name: indexName,
  dimension: 1024, // Replace with your model dimensions
  metric: "cosine", // Replace with your model metric
  spec: {
    serverless: {
      cloud: "aws",
      region: "us-east-1",
    },
  },
});
