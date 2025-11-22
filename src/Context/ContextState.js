import react from "react";
import { useState } from "react";
import AppContext from "./AppContext";
import Host from "../Host";

const ContextState = (props) => {
  const userData = [];
  const entryData = [];
  const stateData = [];
  const [adminDetail, setAdminDetail] = useState(userData);
  const [entries, setEntries] = useState(entryData);
  const [allState, setAllState] = useState(stateData);

  // Get getAccount detail
  const getAccountDetails = async () => {
    const response = await fetch(`${Host}/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setAdminDetail(json);
  };

  // Get getAllEntries detail
  const getAllEntries = async () => {
    const response = await fetch(`${Host}/entry/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setEntries(json);
  };

  // Get getAllEntries detail
  const getAllState = async () => {
    const response = await fetch(`${Host}/entry/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setAllState(json);
  };

  return (
    <AppContext.Provider
      value={{
        adminDetail,
        getAccountDetails,

        entries,
        getAllEntries,
        allState,
        getAllState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextState;
