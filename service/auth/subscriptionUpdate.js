const { User } = require("../../models");
require("dotenv").config();

const subscriptionUpdate = async (id, subscription) => {
  const index = ["starter", "pro", "business"].indexOf(subscription);

  if (index === -1) {
    throw new Error(
      "Subscription have to be one of 'starter', 'pro', 'business'"
    );
  }

  return User.findByIdAndUpdate(
    { _id: id },
    { subscription },
    { new: true }
  ).select({ email: 1, subscription: 1 });
};

module.exports = subscriptionUpdate;
