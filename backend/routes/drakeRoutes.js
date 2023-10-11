import express from "express";
import { Drake } from "../models/drakeModel.js"; // Ensure the model is exported correctly in drakeModel.js

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.album ||
      !request.body.song ||
      !request.body.year ||
      !request.body.bar ||
      !request.body.ytLink ||
      !request.body.timestamp
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: album, song, year, bar, ytLink, timestamp",
      });
    }

    const newDrake = {
      album: request.body.album,
      song: request.body.song,
      year: request.body.year,
      bar: request.body.bar,
      ytLink: request.body.ytLink,
      timestamp: request.body.timestamp,
    };

    const drake = await Drake.create(newDrake);

    return response.status(201).send(drake);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/", async (request, response) => {
  try {
    const drakes = await Drake.find({});

    return response.status(200).json({
      count: drakes.length,
      data: drakes,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.album ||
      !request.body.song ||
      !request.body.year ||
      !request.body.bar ||
      !request.body.ytLink ||
      !request.body.timestamp
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: album, song, year, bar, ytLink, timestamp",
      });
    }
    const { id } = request.params;
    const result = await Drake.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Drake not found" });
    }
    return response.status(200).json({ message: "Drake updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const drake = await Drake.findById(id);

    return response.status(200).json(drake);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Drake.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Drake not found" });
    }
    return response.status(200).json({ message: "Drake deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
