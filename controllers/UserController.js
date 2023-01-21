const {
  registration,
  login,
  logout,
  updateAvatar,
  subscriptionUpdate,
  verifyEmail,
  reVerifyEmail,
} = require("../service");
class AuthControllers {
  singup = async (req, res, next) => {
    const { email, password, subscription } = req.body;

    try {
      const result = await registration(email, password, subscription);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
  singin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const result = await login(email, password);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
  logout = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
      await logout(authorization);

      res.status(204).json({
        status: "No content",
        code: "204",
      });
    } catch (error) {
      next(error);
    }
  };

  current = async (req, res, next) => {
    const { email, subscription } = req.user;
    try {
      res.json({
        status: "sucess",
        code: 200,
        data: {
          user: {
            email,
            subscription,
          },
        },
      });
    } catch (e) {
      next(e);
    }
  };

  subscriptionUpdate = async (req, res, next) => {
    const id = req.user._id;
    const { subscription } = req.body;
    try {
      const user = await subscriptionUpdate(id, subscription);

      res.json({
        status: "Success",
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  updateAvatar = async (req, res, next) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    try {
      const result = await updateAvatar(_id, tempUpload, originalname);
      res.json({ result });
    } catch (error) {
      await fs.unlink(req.file.path);
      next(error);
    }
  };
  verifyEmail = async (req, res, next) => {
    const { verificationToken } = req.params;
    try {
      const result = await verifyEmail(verificationToken);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
  reVerificationEmail = async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await reVerifyEmail(email);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AuthControllers();
