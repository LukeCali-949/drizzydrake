"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { AiOutlineLink, AiOutlineDelete } from "react-icons/ai";
import { IconContext } from "react-icons";
import FormComponent from "./FormComponent";

const drakeTable = ({
  drakeBarsObj,
  isModalOpen,
  setIsModalOpen,
  setCount,
}) => {
  // "data": [
  //   {
  //       "_id": "65235371ecb325651833dc6f",
  //       "album": "Nothing was the same",
  //       "song": "Tuscan Leather",
  //       "year": 2011,
  //       "bar": "Let the money talk like fortune tells",
  //       "ytLink": "youtube.com/drake",
  //       "timestamp": "30s",
  //       "createdAt": "2023-10-09T01:12:17.585Z",
  //       "updatedAt": "2023-10-09T01:12:17.585Z",
  //       "__v": 0
  //   },
  //   {
  //       "_id": "652353fcecb325651833dc74",
  //       "album": "Scorpion",
  //       "song": "Finesse",
  //       "year": 2018,
  //       "bar": "Fashion week is more your thing than mine",
  //       "ytLink": "youtube.com/drake",
  //       "timestamp": "30s",
  //       "createdAt": "2023-10-09T01:14:36.115Z",
  //       "updatedAt": "2023-10-09T01:14:36.115Z",
  //       "__v": 0
  //   }
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBar = (id) => {
    axios
      .delete(`http://localhost:6969/drizzybars/${id}`)
      .then(() => {
        enqueueSnackbar("Bar Deleted successfully", { variant: "success" });
        setCount((prevCount) => prevCount + 1);
      })
      .catch((error) => {
        // alert('An error happened. Please Chack console');
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="mx-10 ">
      <div className="w-full overflow-hidden rounded shadow-lg mt-6 bg-gray-900 text-gray-200 relative border-[20px] border-gray-900">
        <div className="flex justify-between items-center bg-gray-800 p-4">
          <div className="font-bold text-xl">Drake Bars</div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Add Bar
          </button>
        </div>
        <div className="text-sm p-4">
          A list of all the Drake bars that I have collected like infinity
          stones
        </div>
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-r border-gray-700">
                Album
              </th>
              <th className="px-6 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-r border-gray-700">
                Song
              </th>
              <th className="px-6 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-r border-gray-700">
                Bar
              </th>
              <th className="px-6 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-r border-gray-700">
                Year
              </th>
              <th className="pl-6 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-r border-gray-700">
                Link
              </th>
              <th className="pl-6 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {drakeBarsObj.map((drakeBar, idx) => (
              <tr key={idx}>
                <td
                  className="px-4 py-4 whitespace-nowrap border-r border-gray-700"
                  onClick={() => console.log(drakeBar._id)}
                >
                  {drakeBar.album}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-700">
                  {drakeBar.song}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-700">
                  {`"${drakeBar.bar}"`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-700">
                  {drakeBar.year}
                </td>
                <td className="pl-6 py-4 whitespace-nowrap border-r border-gray-700">
                  <IconContext.Provider value={{ size: "1.5em" }}>
                    <a
                      href={`${drakeBar.ytLink}&t=${drakeBar.timestamp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AiOutlineLink />
                    </a>
                  </IconContext.Provider>
                </td>
                <td className="pl-6 py-4 whitespace-nowrap">
                  <IconContext.Provider value={{ size: "1.5em" }}>
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteBar(drakeBar._id);
                      }}
                    >
                      <AiOutlineDelete />
                    </button>
                  </IconContext.Provider>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-90"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-gray-800 text-gray-200 p-8 rounded-xl shadow-md max-w-lg mx-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <FormComponent onSuccess={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default drakeTable;
