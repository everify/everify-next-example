import { Everify } from "everify-node";

const everify = new Everify(process.env.EVERIFY_API_KEY);
everify.sandbox(); // Remove this before taking the project to production

export default async (req, res) => {
  const response = await everify.startVerification({
    phoneNumber: req.body.phoneNumber,
  });
  res.status(200).json(response);
};
