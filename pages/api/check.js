import { Everify } from "everify-node";

const everify = new Everify(process.env.EVERIFY_API_KEY);

export default async (req, res) => {
  const response = await everify.checkVerification({
    phoneNumber: req.body.phoneNumber,
    code: req.body.verificationCode,
  });
  res.status(200).json(response);
};
