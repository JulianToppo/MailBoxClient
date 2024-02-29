import React, { useEffect, useState } from "react";
import { backendURL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import {
  deleteMail,
  getTotalUnreadMails,
  setMail,
  setSentMail,
  updateReadInMail,
} from "../store/mailSlice";
import { useDispatch, useSelector } from "react-redux";
import useApiCall from "../hooks/useApiCall";
import useCrudForMail from "../hooks/useCrudForMail";
import Header from "./Header";
import UserCredentials from "./UserCredentials";

const Inbox = () => {
  const [allmails, setallmails] = useState([]);
  const [totalUnread, setTotalUnread] = useState(0);
  const [showMailMessage, setShowMailMessage] = useState(false);
  const [showSentMessages, setShowSentMailMessage] = useState(false);
  const [sentMails, setSentMails] = useState([]);

  const navigate = useNavigate();
  const mailStore = useSelector((store) => store.mail);
  const dispatch = useDispatch();

  const { getAllMailDB, getAllSentMailDB, deleteMailDB, updateMailDB ,getUserData } =
    useCrudForMail();

  useEffect(() => {
    const time = setTimeout(() => {
      getAllMailDB();
    }, 10000);

    return () => {
      clearTimeout(time);
    };
  }, [getAllMailDB]);

  useEffect(() => {
    setSentMails(mailStore.sentMails);
  }, [mailStore.sentMails]);

  useEffect(() => {
    setallmails(mailStore.mails);
    setTotalUnread(mailStore.totalUnread);
  }, [mailStore.mails]);

  const onclickCompose = (e) => {
    e.preventDefault();
    navigate("/composemail");
  };

  const onClickDelete = (id) => {
    deleteMailDB(id);
  };

  const onClickMessage = (messageObj) => {
    setShowMailMessage(messageObj);
    updateMailDB(messageObj.id);
  };

  const OnClickShowSentMails = (e) => {
    e.preventDefault();
    setShowMailMessage(false);
    setShowSentMailMessage(true);
    console.log("show sent mails")
    getAllSentMailDB();
  };

  const onclickShowInbox= (e)=>{
    e.preventDefault();
    setShowMailMessage(false);
    setShowSentMailMessage(false);
  }

  return (
    <div className="h-screen">
     <Header/>

      <div className="flex  h-full bg-red-300">
        <div className="w-2/12 bg-slate-400">
          <button
            className="p-2 px-6 bg-blue-400 m-4 "
            onClick={onclickCompose}
          >
            Compose
          </button>

          <div className="flex flex-col space-y-3 m-2 ">
            <p  className="cursor-pointer" onClick={onclickShowInbox}>Inbox {mailStore.totalUnread}</p>
            <p>Unread</p>
            <p>Starred</p>
            <p>Drafts</p>
            <p className="cursor-pointer" onClick={OnClickShowSentMails}>
              Sent
            </p>
            <p>Archive</p>
            <p>Spam</p>
            <p>Deleted Items</p>
          </div>
        </div>
        {!showMailMessage ? (
          <div className="w-full bg-green-50">
            <table className="table-auto w-full p-4 text-left">
              <thead>
                <tr >
                  <th className="px-6 py-2 ">Sender</th>
                  <th>Messages</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allmails && !showSentMessages &&
                  allmails.map((item) => {
                    // console.log(item);
                    return (
                      <tr
                        className={`${
                          !item.read ? "bg-slate-200" : ""
                        } bg-opacity-80 cursor-pointer`}
                      >
                        <th className="flex justify-center">
                          {item.read ? (
                            <div className=""></div>
                          ) : (
                            <div className="w-2 h-2 rounded-3xl bg-blue-400 self-center m-2"></div>
                          )}
                          {item.userId}
                        </th>
                        <th
                          onClick={(e) => {
                            e.preventDefault();
                            onClickMessage(item);
                          }}
                        >
                          {item.content.slice(0,15)}....
                        </th>
                        <th>
                          <button
                            className="px-6 rounded-xl bg-red-300 hover:bg-orange-600"
                            onClick={(e) => {
                              e.preventDefault();
                              onClickDelete(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </th>
                      </tr>
                    );
                  })}

                {showSentMessages &&
                  sentMails.map((item) => {
                    console.log(item);
                    return (
                      <tr
                        className={`${
                          !item.read ? "bg-slate-200" : ""
                        } bg-opacity-80 cursor-pointer`}
                      >
                        <th className="flex justify-center">
                          {item.read ? (
                            <div className=""></div>
                          ) : (
                            <div className="w-1/6 rounded-3xl bg-blue-400"></div>
                          )}
                          {item.userId}
                        </th>
                        <th
                          onClick={(e) => {
                            e.preventDefault();
                            onClickMessage(item);
                          }}
                        >
                          {item.content.slice(0,15)}
                        </th>
                        <th>
                          <button
                            className="px-6 rounded-xl bg-red-300 hover:bg-orange-600"
                            onClick={(e) => {
                              e.preventDefault();
                              onClickDelete(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full bg-white">
            <div>
              <div className="flex justify-around">
                {/* <div>{getUserData}<div> */}
                
                <div
                  onClick={() => {
                    setShowMailMessage(!showMailMessage);
                  }}
                >
                  Back
                </div>
                {/* <div>{Timeout} */}
              </div>
              <div className="w-full p-6 border border-black">
                <UserCredentials showMailMessage={showMailMessage} />
                {showMailMessage.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
