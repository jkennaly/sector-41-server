// bin/create_jwt.js


import {claimString} from './tokens/name.js'
import claimBool from './tokens/boolean.js'
import claimRoles from './tokens/roles.js'
import claimTime from './tokens/updated_at.js'
import claimScope from './tokens/scope.js'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()
//make one of these:

/*
id claims:
{
  "__raw": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5UYzVSRGM1TjBORU1UY3hORFJHTTBVeU9EaEZSREpEUlRRM05UbEZRakZDTURBMFJrTkRSQSJ9.eyJodHRwczovL2Zlc3RpZ3JhbS9yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwibmlja25hbWUiOiJqa2VubmFseSIsIm5hbWUiOiJqa2VubmFseUBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNTBhNjNiYjk3ODBmODIxNzg0YjJkYjdlNjljOGI2NjE_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqay5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMC0xMi0xMFQwMDowNDo1NS44MDZaIiwiZW1haWwiOiJqa2VubmFseUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9mZXN0aXZhbHRpbWUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDViNmFjZTAzYjc4NmY1MzFkZTM5ZjE2ZCIsImF1ZCI6Ijd4czFrem1DZGM5SFljMUNwMGJ1UWJBVEdVYjNqOUFsIiwiaWF0IjoxNjA3NTU4NzAwLCJleHAiOjE2MDc1OTQ3MDAsIm5vbmNlIjoiYkhFMU4zUjBiMHgyUlZKUlNWcElhbTFpVFhWMFZqRjRRVXBwUTBWS2QzVXlhblptYUdaTk9EUkNVUT09In0.oUftTCKNV14BzsBcGbFPvB1tFfaScwAfgLnr2Qbg6dZUjfiYIw-qrHMWOZ-l2iffO6Rn5DsXprk1J-_GcmqlbZ5j0Q7AWmAalGbkGFZkGvApfkondHbWKdCgS_ZNb_1np94akY2hhibaA5Rm0FsjqZpmv00BGKMoojjgUxK7oqOrcxcjFTA3eiiM3pP4QIdmDwFxkipkEmZDAAHvNaKhiFe9FqILVA2rd68NA-SteRYD6OwGvIgOaKjOo7VkaGVwozlrEXLm8-BemdgbC2dIg-PrwR8x59cwwMCY65AR2KNDhgGdmtL7_6Iv-07xvZvQr2EODR4AUfTJ9jRh6rSE-w",
  "https://festigram/roles": [
    "user",
    "admin"
  ],
  "nickname": "jkennaly",
  "name": "jkennaly@gmail.com",
  "picture": "https://s.gravatar.com/avatar/50a63bb9780f821784b2db7e69c8b661?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjk.png",
  "updated_at": "2020-12-10T00:04:55.806Z",
  "email": "jkennaly@gmail.com",
  "email_verified": true,
  "iss": "https://festivaltime.auth0.com/",
  "sub": "auth0|5b6ace03b786f531de39f16d",
  "aud": "7xs1kzmCdc9HYc1Cp0buQbATGUb3j9Al",
  "iat": 1607558700,
  "exp": 1607594700,
  "nonce": "bHE1N3R0b0x2RVJRSVpIam1iTXV0VjF4QUppQ0VKd3UyanZmaGZNODRCUQ=="
}
raw decoded:
{
  iss: 'https://festivaltime.auth0.com/',
  sub: 'auth0|5b6ace03b786f531de39f16d',
  aud: [
    'https://festigram.0441.design/api/',
    'https://festivaltime.auth0.com/userinfo'
  ],
  iat: 1607558700,
  exp: 1607645100,
  azp: '7xs1kzmCdc9HYc1Cp0buQbATGUb3j9Al',
  scope: 'openid profile email admin create:messages verify:festivals create:festivals admin create:messages create:festivals verify:festivals'
}
{
  alg: 'RS256',
  typ: 'JWT',
  kid: 'NTc5RDc5N0NEMTcxNDRGM0UyODhFRDJDRTQ3NTlFQjFCMDA0RkNDRA'
}
*/
const defaultScopes = "openid profile email create:messages"
const adminScopes = "admin verify:festivals create:festivals"
function create(jwks, scopes = defaultScopes, { email, access, username, updated_at, emailVerified, mobile_auth_key: id, picture }) {
  if (!scopes) throw new Error('required parameter missing')

  const claimObject = Object.assign(
    {
      iss: 'https://festigram.app',
      aud: [
        'https://festigram.app/api/'
      ]
    },
    claimRoles(access),
    claimString(email),
    claimString(email, 'email'),
    claimString(username, 'nickname'),
    claimString(picture, 'picture'),
    claimString(`fest|${id}`, 'sub'),
    claimTime(updated_at),
    claimBool(emailVerified, 'email_verified'),
    claimScope(scopes, access)
  )
  return jwt.sign(claimObject, process.env.LOCAL_SECRET, {
    expiresIn: '10m',
    algorithm: 'RS256',
    keyid: jwks.keys[0].kid

  })

}

export default create
