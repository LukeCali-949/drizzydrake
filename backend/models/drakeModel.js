import mongoose from "mongoose";

const drakeSchema = mongoose.Schema(
  {
    album: {
      type: String,
      required: true,
    },
    song: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    bar: {
      type: String,
      required: true,
    },
    ytLink: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Drake = mongoose.model("Drake", drakeSchema);
