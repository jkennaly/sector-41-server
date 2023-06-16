import express from 'express';
import {Suggestion, S3Image} from '../models.js';
import axios from 'axios';

const router = express.Router();


router.post('/', async (req, res) => {
    try{
    //verify user is logged in
      const user = req.user || { ftUserId: 0 };
      if(!user.ftUserId) throw new Error('No ftUserId provided');

    //retrieve upstream context of request focus
    const {
        game = {}, 
        context, 
        display,
        formData,
        gameId,
        character,
    } = req.body;
    const characterId = character && character.id
    ////('suggestion req body', formData, req.body);
    const suggestion = await Suggestion.create({
        params: req.body,
        creatorId: user.ftUserId,
        gameId: gameId || game.id,
        characterId,

    });
    //console.log('suggestion', suggestion);
    const body = characterId ? await suggestion.getCharacterBody() : await suggestion.getBody() ;

    //console.log('suggestion body', JSON.stringify(body));

    //send request to gpt-3.5-turbo model api
    const response = await axios.post('https://api.openai.com/v1/chat/completions',
        body,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
            }
        }
    )
    //parse response
    const {choices} = response.data;
    //console.log('suggestion response', response.data);
    //save response to db
    await suggestion.update({choices});
    suggestion.save();
    //send response to client
    return res.status(200).json({ suggestion: choices[0]?.message?.content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }



});

router.post('/portrait', async (req, res) => {
    try{
    //verify user is logged in
      const user = req.user || { ftUserId: 0 };
      if(!user.ftUserId) throw new Error('No ftUserId provided');

    //retrieve upstream context of request focus
    const {
        game = {}, 
        context, 
        display,
        formData,
        gameId,
        character,
    } = req.body;
    const characterId = character && character.id
    //console.log('suggestion req body', formData, req.body);
    const suggestion = await Suggestion.create({
        params: req.body,
        creatorId: user.ftUserId,
        gameId: gameId || game.id,
        characterId,

    });
    //console.log('suggestion', suggestion);
    const body = await suggestion.getCharacterPortraitBody()

    //console.log('suggestion body', JSON.stringify(body));

    //send request to gpt-3.5-turbo model api
    const response = await axios.post('https://api.openai.com/v1/images/generations',
        body,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
            }
        }
    )
    //parse response
    const choices = response.data;
    //console.log('suggestion response', response.data);
    //save response to db
    await suggestion.update({choices});
    suggestion.save();

    //load the image from the url and store it in s3
    const image = await axios.get(choices?.data[0]?.url, {
        responseType: 'arraybuffer',
        // headers: {
        //     'Content-Type': 'image/png',
        //     'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
        // }
    });
    const parameters = {
        Bucket: 'sector-41',
        Key: `suggestions/${suggestion.id}.png`,
        Body: image.data,
        ContentType: 'image/png',
        metadata: {
            suggestion: suggestion.id,
        }
    };
    const s3 = await S3Image.uploadImage(parameters)
    const url = await s3.getDownloadURL();
    //console.log('s3 url', url);
    //send the url to the client
    return res.status(200).json({ url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }


});

export default router;
