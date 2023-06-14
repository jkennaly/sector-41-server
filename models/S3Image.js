import { DataTypes, Model } from 'sequelize';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createRequest } from "@aws-sdk/util-create-request";
import { formatUrl } from "@aws-sdk/util-format-url";
import sequelize from '../db/sequelize.js';

const s3 = new S3Client({ 
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_REGION 
});

class S3Image extends Model {
    // Upload an image to S3
    static async uploadImage(params) {

        await s3.send(new PutObjectCommand(params));

        return this.create({
            key: params.Key,
            bucket: params.Bucket,
            metadata: params,
        });
    }

    // Get a download URL for the image
    async getDownloadURL() {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: this.key,
        });
        
        const request = await createRequest(s3, command);

        // Presign the URL for 7 days
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 24 * 7 });

        console.log('getDownloadURL signedUrl', signedUrl);
        return signedUrl
    }
}

S3Image.init({
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    bucket: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    metadata: {
        type: DataTypes.JSON,
    },
}, {
    sequelize,
    modelName: 'S3Image',
});

export default S3Image;
