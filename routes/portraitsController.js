import { Portrait } from '../models/games/index.js';

const portraitsController = {

  async getById(req, res) {
    try {
      const portrait = await Portrait.findByPk(req.params.id);
      if (portrait) {
        res.status(200).json(portrait);
      } else {
        res.status(404).json({ message: 'Portrait not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async updatePortraitUrl(req, res) {
    try {
      const portrait = await Portrait.findByPk(req.params.id);
      if (portrait && isSignedS3Url(portrait.imageUrl)) {
        const remainingUrlTime = secondsUntilExpiry(portrait.imageUrl);
        //if remaining time is less than 1 dat, generate a new one
        if (remainingUrlTime < 86400) {
          portrait.imageUrl = await portrait.generateSignedUrl();
        }
        res.status(200).json(portrait);
      } else {
        res.status(404).json({ message: 'Portrait not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
};

export default portraitsController;


function isSignedS3Url(url) {
  if(!url) return false;
  try {
      const parsedUrl = new URL(url);
      const requiredParams = ['X-Amz-Algorithm', 'X-Amz-Credential', 'X-Amz-Signature', 'X-Amz-Date', 'X-Amz-Expires'];
      return requiredParams.every(param => parsedUrl.searchParams.has(param));
  } catch (e) {
      return false;
  }
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
