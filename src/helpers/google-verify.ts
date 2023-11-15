import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

const googleVerify = async( idToken : string ) => {
 
  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,   
  });
 
  const payload = ticket.getPayload();  
 

  // Using optional chaining operator
  const name = payload?.name ?? 'Name not available';
  const img = payload?.picture ?? 'Image not available';
  const email = payload?.email ?? 'Email not available';

  return { name, img, email };

}

export default googleVerify;
 