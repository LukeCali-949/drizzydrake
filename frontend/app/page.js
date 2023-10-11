"use client";

import { SnackbarProvider } from "notistack";
import Image from "next/image";
import DrakeTable from "./components/DrakeTable";
import FormComponent from "./components/FormComponent";
import React from "react";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

export default function Home() {
  const [drakeBars, setDrakeBars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:6969/drizzybars")
      .then((response) => {
        setDrakeBars(response.data.data);
        console.log("RAN!");
        enqueueSnackbar("Drake Bars Loaded Succesfully", {
          variant: "success",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [isModalOpen, count]);

  return (
    <>
      <SnackbarProvider>
        <div className="mt-5">
          <DrakeTable
            drakeBarsObj={drakeBars}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setCount={setCount}
          />
        </div>
      </SnackbarProvider>
    </>
  );
}
