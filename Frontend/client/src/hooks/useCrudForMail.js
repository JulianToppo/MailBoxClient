import React from "react";
import useApiCall from "./useApiCall";
import { backendURL } from "../utils/constants";
import {
  deleteMail,
  setMail,
  setSentMail,
  updateReadInMail,
} from "../store/mailSlice";
import { useDispatch } from "react-redux";

const useCrudForMail = () => {
  //  getall, getsentmail,deleteMailDB,updateEmailDB
  const { fetchData } = useApiCall();

  const dispatch = useDispatch();

  const getAllMailDB = async () => {
    const data = await fetchData(backendURL + "getAllMail", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (data) {
      dispatch(setMail({ mail: data.mailElements }));
    }
  };

  const getAllSentMailDB = async () => {
    const data = await fetchData(backendURL + "getAllSentMail", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    console.log(data);
    if (data) {
      dispatch(setSentMail({ mail: data.mailElements }));
    }
  };

  const deleteMailDB = async (id) => {
    const response = await fetchData(backendURL + "deletemail/" + id, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    dispatch(deleteMail({ id: id }));
  };

  const updateMailDB = async (id) => {
    console.log("idddd", id);
    const response = await fetchData(backendURL + "updateemail", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        Authorization: localStorage.getItem("token"),
        'Content-Type':'application/json'
      },
    });

    dispatch(updateReadInMail({ id: id }));
  };

  return {
    getAllMailDB,
    getAllSentMailDB,
    deleteMailDB,
    updateMailDB,
  };
};

export default useCrudForMail;
