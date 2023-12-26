import { connectDb } from "@/utils/database";
import jwt from 'jsonwebtoken';
import User from "@/models/user";

async function handler(req, res) {
  try {
    await connectDb();

    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || 'votre_clé_secrète');
    const userId = decodedToken.userId;

    const closeAudit = req.body;
    //console.log(openAudit)
   
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.closeAudit.push(closeAudit);
    await user.save();

    return res.status(200).json({ message: 'OpenAudit data saved successfully', user });
  } catch (error) {
    console.error('Error saving OpenAudit data:', error);

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default handler;