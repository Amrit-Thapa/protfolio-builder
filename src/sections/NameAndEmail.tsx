import {useAppContext} from "@/context/AppContext";
import {Actions} from "@/context/reducer";
import React, {useState} from "react";

const NameAndEmail = () => {
  const {state, dispatch} = useAppContext();
  const {profile} = state;
  const [profileUpdate, setProfileUpdate] = useState(profile);
  const {activeSection, preview, publish} = state;
  const isSectionActive = activeSection === "Intro";
  const viewOnly = publish || preview;

  return (
    <>
      <input
        className="w-full mt-5 font-bold text-black bg-transparent outline-none placeholder:text-[#AAAAAA]"
        value={profileUpdate.name}
        placeholder="Enter your name here"
        disabled={!isSectionActive || viewOnly}
        onChange={(e) => {
          setProfileUpdate((prev) => {
            return {
              ...prev,
              name: e.target.value,
            };
          });
          dispatch({type: Actions.SET_PROFILE, payload: profileUpdate});
        }}
      />
      <input
        className="w-full mt-3 text-sm font-normal text-black bg-transparent outline-none"
        value={profileUpdate.email}
        placeholder="Enter email"
        disabled={!isSectionActive || viewOnly}
        onChange={(e) => {
          setProfileUpdate((prev) => {
            return {
              ...prev,
              email: e.target.value,
            };
          });
          dispatch({type: Actions.SET_PROFILE, payload: profileUpdate});
        }}
      />
    </>
  );
};

export default NameAndEmail;
