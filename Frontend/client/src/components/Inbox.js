import React, { useEffect, useState } from "react";
import { backendURL } from "../utils/constants";
import { Await, useNavigate } from "react-router-dom";
import {
  deleteMail,
  getTotalUnreadMails,
  setMail,
  setSentMail,
  updateReadInMail,
} from "../store/mailSlice";
import { useDispatch, useSelector } from "react-redux";
import useApiCall from "../hooks/useApiCall";


const Inbox = () => {
  const [allmails, setallmails] = useState([]);
  const [totalUnread, setTotalUnread] = useState(0);
  const [showMailMessage, setShowMailMessage] = useState(null);
  const [showSentMessages, setShowSentMailMessage] = useState(false);
  const [sentMails, setSentMails] = useState([]);

  const navigate = useNavigate();
  const mailStore = useSelector((store) => store.mail);
  const dispatch = useDispatch();

 useApiCall(backendURL + "getallmail", true,(data)=>{
    data && dispatch(setMail({ mail: data.mailElements }))
  });
 
console.log("This is rendered again")
useApiCall(
    backendURL + "getallsentmail",
    showSentMessages,(data)=>{
        {data && dispatch(setSentMail({ mail: data.mailElements }));}
    }
  );



  useEffect(() => {
    setSentMails(mailStore.sentMails);
  }, [mailStore.sentMails]);

  useEffect(() => {
    setTotalUnread(mailStore.totalUnread);
  }, [mailStore.totalUnread]);

  useEffect(() => {
    console.log("useEffect", mailStore.mails);
    setallmails(mailStore.mails);
    setTotalUnread(mailStore.totalUnread);
  }, [mailStore.mails]);

  // const getAllMails = async () => {
  //   try {
  //     console.log("get all mails called");
  //     const response = await fetch(backendURL + "getallmail", {
  //       method: "GET",
  //       headers: {
  //         Authorization: localStorage.getItem("token"),
  //       },
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log("data fetchedddd", data);
  //       dispatch(setMail({ mail: data.mailElements }));
  //       // dispatch(getTotalUnreadMails());
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getAllSentMails = async () => {
  //   try {
  //     console.log("get all sent mails called");
  //     const response = await fetch(backendURL + "getallsentmail", {
  //       method: "GET",
  //       headers: {
  //         Authorization: localStorage.getItem("token"),
  //       },
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log("data fetched", data);
  //       dispatch(setSentMail({ mail: data.mailElements }));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log("setitmeoutcalled ")
  //     getAllMails();
  //   }, 2000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [getAllMails]);

  const onclickCompose = (e) => {
    e.preventDefault();
    navigate("/composemail");
  };

  const deleteMailFromDB = async (id) => {
    try {
      const response = await fetch(backendURL + "deletemail/" + id, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        dispatch(deleteMail({ id: id }));
        console.log("Mail has been deleted");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const onClickDelete = (id) => {
    deleteMailFromDB(id);
  };

  const updateReadMessage = async (id) => {
    try {
      console.log(id);
      const response = await fetch(backendURL + "updateemail", {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        console.log("Mail has been updated");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const onClickMessage = (messageObj) => {
    console.log(messageObj);
    setShowMailMessage(messageObj);
    dispatch(updateReadInMail({ id: messageObj.id }));
    updateReadMessage(messageObj.id);
  };

  const OnClickShowSentMails = (e) => {
    e.preventDefault();

    setShowMailMessage(false);
    setShowSentMailMessage(true);
    // getAllSentMails();
   
  };

  return (
    <div className="h-screen">
      <div className="flex justify-around p-3 h-4/12 bg-blue-200">
        <img src={"mail.png"} className="h-[30px]"></img>
        <input className="w-1/2 rounded-md"></input>
      </div>

      <div className="flex  h-full bg-red-300">
        <div className="w-2/12 bg-slate-400">
          <button
            className="p-2 px-6 bg-blue-400 m-4 "
            onClick={onclickCompose}
          >
            Compose
          </button>

          <div className="flex flex-col space-y-3 m-2 ">
            <p>Inbox {mailStore.totalUnread}</p>
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
                <tr>
                  <th className="px-6 py-2 ">Sender</th>
                  <th>Messages</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allmails &&
                  allmails.map((item) => {
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
                          {item.content}
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
                          {item.content}
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
