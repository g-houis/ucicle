import { ObjectCannedACL, PutObjectCommand, S3Client, StorageClass } from '@aws-sdk/client-s3';

/**
 *
 * @param object The javascript object you want to upload
 * @param filename The name of the file containing the object
 * @param bucket Name of the bucket to which the file will be uploaded
 * @param storageClass Name of the bucket to which the file will be uploaded
 * @param acl Name of the bucket to which the file will be uploaded
 */
export async function uploadObject(object: unknown, filename: string, bucket: string, storageClass?: StorageClass, acl?: ObjectCannedACL): Promise<void> {
    if (!process.env.ACCESS_KEY) throw Error('ACCESS_KEY environment variable not defined');
    if (!process.env.SECRET_KEY) throw Error('SECRET_KEY environment variable not defined');
    if (!process.env.DOMAIN) throw Error('DOMAIN environment variable not defined');

    const client: S3Client = new S3Client({
        endpoint: `https://${process.env.DOMAIN}`,
        credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY
        },
        region: process.env.REGION
    });

    const command: PutObjectCommand = new PutObjectCommand({
        Bucket: bucket,
        Key: filename,
        Body: JSON.stringify(object),
        StorageClass: storageClass || 'STANDARD',
        ACL: acl || 'private'
    });

    await client.send(command);
}
