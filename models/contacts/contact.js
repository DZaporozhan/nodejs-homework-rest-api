const { model, Schema } = require("mongoose");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
};
