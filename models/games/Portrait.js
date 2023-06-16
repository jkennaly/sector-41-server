import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../db/sequelize.js';

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ 
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_REGION 
});

export const Portrait = sequelize.define('Portrait', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  personalDataFileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PersonalDataFiles',
      key: 'id',
    },
  },
});

Portrait.prototype.generateSignedUrl = async function() {
  if(!this.imageUrl) throw new Error('No image URL');
  //if the current URL has at least a day left, return that
  const secondsLeft = secondsUntilExpiry(this.imageUrl);
  if(secondsLeft > 60 * 60 * 24) return this.imageUrl;


  const { bucket, key } = extractBucketAndKey(this.imageUrl);
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 24 * 7 });
  //update the URL in the database
  this.imageUrl = signedUrl;
  await this.save();

  return signedUrl;
}


Portrait.associate = function(models) {
  Portrait.belongsTo(models.PersonalDataFile, { foreignKey: 'personalDataFileId' });
  Portrait.hasOne(models.S3Image, { foreignKey: 'imageId' })
};

export default Portrait;

function extractBucketAndKey(s3Url) {
  const url = new URL(s3Url);
  const bucket = url.hostname.split('.')[0];
  const key = url.pathname.slice(1);  // Remove the leading '/'

  return { bucket, key };
}

function secondsUntilExpiry(signedS3Url) {
  const url = new URL(signedS3Url);
  const amzDate = url.searchParams.get('X-Amz-Date');
  const expiresInSeconds = parseInt(url.searchParams.get('X-Amz-Expires'));

  const amzDateTime = Date.UTC(
      parseInt(amzDate.slice(0, 4)),  // Year
      parseInt(amzDate.slice(4, 6)) - 1,  // Month
      parseInt(amzDate.slice(6, 8)),  // Day
      parseInt(amzDate.slice(9, 11)),  // Hour
      parseInt(amzDate.slice(11, 13)),  // Minute
      parseInt(amzDate.slice(13, 15))  // Second
  );

  const expiryTime = new Date(amzDateTime + expiresInSeconds * 1000);
  const currentTime = new Date();

  // Calculate the difference between the expiry time and current time
  const diffInSeconds = Math.floor((expiryTime - currentTime) / 1000);

  // If the URL has expired, return 0
  return diffInSeconds > 0 ? diffInSeconds : 0;
}