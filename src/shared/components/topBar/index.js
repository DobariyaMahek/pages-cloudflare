 
import React, { useEffect } from "react";
import styles from "./topBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getOffer } from "@/store/ApiSlice/restAllSlice";
export default function TopBar() {
  const dispatch = useDispatch();
  const { offerData } = useSelector((state) => state.restall);
  const { isOpenNavbar } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOffer());
  }, []);

  return (
    <div className={`${styles.topbar} ${isOpenNavbar ? styles.hideTopbar : ""}`}>
      <div className="container">
        <p>{offerData?.[0]?.title}</p>
      </div>
    </div>
  );
}
