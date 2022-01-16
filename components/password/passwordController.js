import passwordService from "./passwordService.js";
export const sendChangePasswordMail = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const result = await passwordService.sendRenewPasswordMail(email);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}

export const updateNewPassword = async (req, res) => {
  const { userId } = req.params;
  const { passwordId } = req.query;
  const { password } = req.body;
  
  try {
    const result = await passwordService.saveNewPassword(userId, passwordId, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}