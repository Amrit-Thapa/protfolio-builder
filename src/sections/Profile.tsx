import ImagePicker from "@/component/ImagePicker";
import imageIcon from "@/../public/assets/icons/imageIcon.png";
import React, {useState} from "react";
import useDeviceType from "@/hooks/useDeviceType";
import If from "@/component/If";
import FocusOutWrapper from "@/component/FocusOutWrapper";
import {useAppContext} from "@/context/AppContext";
import {Actions} from "@/context/reducer";
import NameAndEmail from "./NameAndEmail";
import CurrentCompany from "./CurrentCompany";

const Profile = () => {
  const device = useDeviceType();
  const {state, dispatch} = useAppContext();
  const {profile} = state;
  const [profileUpdate, setProfileUpdate] = useState(profile);

  return (
    <FocusOutWrapper
      onFocusOut={() =>
        dispatch({type: Actions.SET_PROFILE, payload: profileUpdate})
      }
    >
      <div className="mt-10 md:mt-28">
        <ImagePicker
          src={profileUpdate.profileImage || imageIcon.src}
          height={295}
          width={295}
          disabled={false}
          onChange={(b64) =>
            setProfileUpdate((prev) => {
              return {
                ...prev,
                profileImage: b64 as string,
              };
            })
          }
          id="profile-icon"
        />

        <If condition={device === "web"}>
          <div className="mt-5">
            <NameAndEmail />
          </div>
          <div className="mt-5">
            <CurrentCompany />
          </div>
        </If>
      </div>
    </FocusOutWrapper>
  );
};

export default Profile;
