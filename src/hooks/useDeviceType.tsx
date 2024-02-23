import {useState, useEffect} from "react";

const useDeviceType = () => {
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsPhone(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      ),
    );
  }, []);

  return isPhone ? "phone" : "web";
};

export default useDeviceType;
