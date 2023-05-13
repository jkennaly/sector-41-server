// profile.js
import express from 'express';;
const router = express.Router();
import { Users as User, UserAliases as UserAlias } from'../models.js';
import gravatar from 'gravatar';;

router.post('/getUserId', async (req, res, next) => {
  const userData = req.body;
  const user = req.user;
  const ftUser = user.ftUserId;

  const authHeader = req.header('Authorization');
  
  if (ftUser) return res.json({ id: ftUser });

  // use the access token to get userinfo

  // compare the idToken user_id field and the user sub field to make sure they match

  try {
    // check if sub has an aliased id and return if present
    const alias = await UserAlias.findOne({ where: { alias: user.sub }});
    if (alias) return res.json({ id: alias.user });

    const email = userData.email || user.email;
    const userByEmail = await User.findOne({ where: { email: email }});
    if (userByEmail) {
      // create an alias to the user with the matching email
      await UserAlias.create({ user: userByEmail.id, alias: user.sub });
      return res.json({ id: userByEmail.id });
    } else {
      const newUser = await User.create({
        email: email,
        username: userData.username || userData.nickname || userData.email || user.nickname,
        picture: userData.picture || user.picture || gravatar.url(email, { protocol: 'https', s: '100' }),
        credits: 1
      });

      // create an alias for the new user
      await UserAlias.create({ user: newUser.id, alias: user.sub });
      return res.json({ id: newUser.id });
    }
  } catch (err) {
    console.log('Error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
