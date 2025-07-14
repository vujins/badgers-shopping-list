import { BlobClient, BlobServiceClient, BlockBlobClient, ContainerClient } from '@azure/storage-blob';

const CONTAINER_NAME = 'web-app-guide-data';

const getBlobServiceClient = (): BlobServiceClient => {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!connectionString) {
    throw new Error('AZURE_STORAGE_CONNECTION_STRING environment variable is not set');
  }

  return BlobServiceClient.fromConnectionString(connectionString);
};

const getContainerClient = (): ContainerClient => {
  const blobServiceClient = getBlobServiceClient();
  return blobServiceClient.getContainerClient(CONTAINER_NAME);
};

const getBlobClient = (blobName: string): BlobClient => {
  const containerClient = getContainerClient();
  return containerClient.getBlobClient(blobName);
};

const getBlockBlobClient = (blobName: string): BlockBlobClient => {
  const containerClient = getContainerClient();
  return containerClient.getBlockBlobClient(blobName);
};

const ensureContainerExists = async (): Promise<void> => {
  const containerClient = getContainerClient();
  try {
    // Try to create container if it doesn't exist
    const exists = await containerClient.exists();
  } catch (error) {
    console.error('Error ensuring container exists:', error);
    // If creation fails, check if container exists anyway
    const exists = await containerClient.exists();
    if (!exists) {
      throw new Error(
        `Container '${CONTAINER_NAME}' does not exist and cannot be created. Please create it in Azure Portal or check permissions.`
      );
    }
  }
};

export const getJsonContent = async <T = any>(fileName: string): Promise<T | null> => {
  try {
    await ensureContainerExists();

    const blobClient = getBlobClient(fileName);

    const exists = await blobClient.exists();
    if (!exists) {
      return null;
    }

    const downloadResponse = await blobClient.download();

    if (!downloadResponse.readableStreamBody) {
      throw new Error('Failed to download blob content');
    }

    const chunks: Buffer[] = [];
    for await (const chunk of downloadResponse.readableStreamBody) {
      chunks.push(Buffer.from(chunk));
    }

    const content = Buffer.concat(chunks).toString('utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error('Error getting JSON content from blob:', error);
    throw error;
  }
};

export const replaceJsonContent = async <T = any>(fileName: string, data: T): Promise<void> => {
  try {
    await ensureContainerExists();

    const blockBlobClient = getBlockBlobClient(fileName);
    const jsonContent = JSON.stringify(data, null, 2);

    await blockBlobClient.upload(jsonContent, jsonContent.length, {
      blobHTTPHeaders: {
        blobContentType: 'application/json',
      },
    });
  } catch (error) {
    console.error('Error replacing JSON content in blob:', error);
    throw error;
  }
};
