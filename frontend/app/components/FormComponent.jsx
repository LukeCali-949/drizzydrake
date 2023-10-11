import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import axios from "axios";

function FormComponent({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    axios
      .post("http://localhost:6969/drizzybars", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Drake bar inserted successfully", {
          variant: "success",
        });
        if (onSuccess) onSuccess();
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const validateYouTubeLink = (value) => {
    if (!value.startsWith("https://www.youtube.com")) {
      return "Please enter a valid YouTube link";
    }

    return true;
  };
  const validateTimestamp = (value) => {
    const regex = /^((\d{1,2})m)?((\d{1,2})s)?$/;

    const match = value.match(regex);

    if (!match) {
      return "Invalid timestamp format";
    }

    const minutes = match[2];
    const seconds = match[4];

    if (!minutes && !seconds) {
      return "Timestamp should have either minutes or seconds or both";
    }

    // Validate minutes
    if (minutes && (parseInt(minutes) < 0 || parseInt(minutes) > 15)) {
      return "Minutes should be between 0 and 15";
    }

    // Validate seconds
    if (seconds && (parseInt(seconds) < 0 || parseInt(seconds) > 59)) {
      return "Seconds should be between 0 and 59";
    }

    return true;
  };

  return (
    <div className="bg-gray-900 p-8 rounded-xl shadow-md max-w-lg mx-auto text-gray-200 drop-shadow-2xl">
      <form
        className="flex flex-col space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <textarea
            className="bg-gray-800 border-2 border-gray-700 rounded-lg w-full text-sm text-gray-200 placeholder-gray-400"
            placeholder="Bar"
            {...register("bar", {
              required: "This field is required",
              minLength: {
                value: 5,
                message: "Bar must be longer than 5 characters",
              },
            })}
          />
          {errors.bar && (
            <p role="alert" className="text-red-400 text-sm py-1">
              {errors.bar.message}
            </p>
          )}
        </div>
        <div>
          <input
            className="bg-gray-800 border-2 border-gray-700 rounded-lg w-full text-gray-200 placeholder-gray-400"
            placeholder="Song"
            {...register("song", { required: "This field is required" })}
          />
          {errors.song && (
            <p role="alert" className="text-red-400 text-sm py-1">
              {errors.song.message}
            </p>
          )}
        </div>
        <div>
          <select
            className="bg-gray-800 border-2 border-gray-700 rounded-lg w-full text-gray-200"
            {...register("album")}
          >
            <option value="Room for Improvement">Room for Improvement</option>
            <option value="Comeback Season">Comeback Season</option>
            <option value="So Far Gone">So Far Gone</option>
            <option value="Thank Me Later">Thank Me Later</option>
            <option value="Take Care">Take Care</option>
            <option value="Nothing Was the Same">Nothing Was the Same</option>
            <option value="If You're Reading This It's Too Late">
              If You're Reading This It's Too Late
            </option>
            <option value="What a Time to Be Alive">
              What a Time to Be Alive
            </option>
            <option value="Views">Views</option>
            <option value="More Life">More Life</option>
            <option value="Scorpion">Scorpion</option>
            <option value="Care Package">Care Package</option>
            <option value="Dark Lane Demo Tapes">Dark Lane Demo Tapes</option>
            <option value="Certified Lover Boy">Certified Lover Boy</option>
            <option value="Honestly Nevermind">Honestly Nevermind</option>
            <option value="Her Loss">Her Loss</option>
            <option value="For All the Dogs">For All the Dogs</option>
            <option value="Other/Single">Other/Single</option>
          </select>
        </div>
        <div>
          <input
            className="bg-gray-800 border-2 border-gray-700 rounded-lg w-12 text-gray-200 placeholder-gray-400"
            maxLength={4}
            placeholder="Year"
            {...register("year", {
              required: "This field is required",
              min: {
                value: 2006,
                message: "Year must be between 2006 to present",
              },
              max: {
                value: 2023,
                message: "Year must be between 2006 to present",
              },
            })}
          />
          {errors.year && (
            <p role="alert" className="text-red-400 text-sm py-1">
              {errors.year.message}
            </p>
          )}
        </div>
        <div>
          <input
            className="bg-gray-800 border-2 border-gray-700 rounded-lg w-full text-gray-200 placeholder-gray-400"
            placeholder="Youtube Link"
            {...register("ytLink", {
              required: "This field is required",
              validate: validateYouTubeLink,
            })}
          />
          {errors.ytLink && (
            <p role="alert" className="text-red-400 text-sm py-1">
              {errors.ytLink.message}
            </p>
          )}
        </div>
        <div>
          <input
            className="bg-gray-800 border-2 border-gray-700 rounded-lg w-full text-gray-200 placeholder-gray-400"
            placeholder="Timestamp"
            {...register("timestamp", {
              required: "This field is required",
              validate: validateTimestamp,
            })}
          />
          {errors.timestamp && (
            <p role="alert" className="text-red-400 text-sm py-1">
              {errors.timestamp.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white border-2 border-gray-700 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormComponent;
