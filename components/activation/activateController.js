import activateService from "./activateService.js";
export const sendActivationMail = async (req, res) => {
  const { userId } = req;
  try {

    const result = await activateService.sendActivationMail(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

}

export const activateAccount = async (req, res) => {

  const { activateId } = req.query;
  const { userId } = req;
  console.log(activateId, userId, 'test');
  try {
    await activateService.activateAccount(userId,activateId);
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: 'Server error. Please try again later. Thank you.'
    })
  }
}