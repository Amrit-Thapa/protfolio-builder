import ImagePicker from "@/component/ImagePicker";
import imageIcon from "@/../public/assets/icons/imageIcon.png";
import React, {useState} from "react";
import useDeviceType from "@/hooks/useDeviceType";
import If from "@/component/If";
import FocusOutWrapper from "@/component/FocusOutWrapper";
import {useAppContext} from "@/context/AppContext";
import {Actions} from "@/context/reducer";

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
          <input
            className="w-full mt-5 font-bold text-black bg-transparent outline-none placeholder:text-[#AAAAAA]"
            value={profileUpdate.name}
            placeholder="Enter your name here"
            onChange={(e) =>
              setProfileUpdate((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              })
            }
          />
          <input
            className="w-full mt-3 text-sm font-normal text-black bg-transparent outline-none"
            value={profileUpdate.email}
            placeholder="Enter email"
            onChange={(e) =>
              setProfileUpdate((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              })
            }
          />
        </If>
      </div>
    </FocusOutWrapper>
  );
};

export default Profile;
