import { Pinecone } from "@pinecone-database/pinecone";

// Initialize Pinecone client
export const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});

// Ensure Pinecone Index
export async function ensurePineconeIndex() {
  try {
    // List existing indexes
    const existingIndexes = await pc.listIndexes();
    if (existingIndexes.indexes) {
      const indexExists = existingIndexes.indexes.some(
        (index) => index.name === "voice-taker"
      );
      // Check if 'voice-taker' already exists
      if (indexExists) {
        return; // If it already exists then we can exit and continue to inserting data into this index
      }

      // If index does not exist, create it
      await pc.createIndex({
        name: "voice-taker",
        dimension: 1536,
        metric: "cosine",
        spec: {
          serverless: {
            cloud: "aws",
            region: "us-east-1",
          },
        },
      });
    }
  } catch (error) {
    console.error("Error ensuring Pinecone index exists: ", error);
  }
}

// Insert Data into Pinecone Index ( Might change it so that in the future, the specific index is
// passed in as parameters as well, but for now we only have 1 index)
export async function insertDataIntoPinecone(embedding: number[]) {
  try {
    const index = pc.Index("rmp-data");

    // Prepare vectors with metadata
    const vectors = {
      id: "1", // Create a unique ID for each embedding
      values: embedding,
    };

    // Upsert vectors into Pinecone
    await index.upsert([vectors]);
  } catch (error) {
    console.error("Error inserting data into Pinecone: ", error);
  }
}
