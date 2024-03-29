import { CircularProgress, Tab, Tabs } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { useQuery } from "react-query";
import howtoplay from "../Assets/howtoplay.PNG";
import AirPlane from "./AirPlane";
import AllBets from "./AllBets";
import AccountMenu from "./MenuItems";
import MyBets from "./MyBets";
import Top from "./Top";
import { gray, graydark } from "./color";
import { useFormik } from "formik";
import { useMediaQuery } from "react-responsive";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { increment, selectCount } from "../redux/slices/counterSlice";

const PlayGame = () => {
  const dispatch = useDispatch()
  const userId = JSON.parse(localStorage.getItem("logindata"))?.id;
  const isMediumScreen = useMediaQuery({ minWidth: 800 });
  const [value, setValue] = React.useState(0);
  const [limit, setlimit] = useState(100);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    anchorEl === null ? setAnchorEl(event.currentTarget) : setAnchorEl(null);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { isLoading, data } = useQuery(
    ["allresult", limit],
    () => resultFunction({ limit: limit }),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const resultFunction = async (reqbody) => {
    try {
      const response = await axios.post(
        "https://gameszone.life/api/aviator/result",
        reqbody
      );
      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  const { isLoading: walletloding, data: walletdata } = useQuery(
    ["walletamount"],
    () => walletamount(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const walletamount = async () => {
    try {
      const response = await axios.get(
        `https://gameszone.life/api/aviator/userwallet?userid=${userId}`
      );
      return response;
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  };

  const result = data?.data?.data || [];
  const walletAmount = walletdata?.data || 0;
  console.log(walletAmount, "amo");
  const initialValue = {
    refetch: 1,
  };
  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      console.log(formik.values);
    },
  });


  
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  return (
    <div className=" h-full">
 
      {isMediumScreen && <div iv className={`bg-[#0E0E0E] h-[10%]`}></div>}
      <div className={`${gray} h-[10%] flex justify-between text-white p-1`}>
        <div>
          <img src={howtoplay} className="h-16" />
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col justify-between">
            <p className="text-[10px] bg-[#f6c74f] text-black px-4 py-1 rounded-md">
              Play for money
            </p>
            <p className="">
              {walletloding ? (
                <CircularProgress />
              ) : (
                <span className="text-green-700 font-bold">
                  {Number(walletAmount?.wallet).toFixed(2) || "0000"}
                </span>
              )}

              <sapn className="text-gray-500 text-[10px]">USD</sapn>
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <RxCross2 className="text-lg cursor-pointer" />
            <CgDetailsMore
              className="text-lg cursor-pointer"
              onClick={(e) => handleClick(e)}
            />
          </div>
        </div>
      </div>
      <div className="flex text-white   lg:flex-row-reverse flex-col">
        {/* // right section */}
        <div className={` w-[100%] h-auto lg:w-[75%]  bg-black p-2 rounded-lg`}>
          <div
            className={` px-1 py-1 flex gap-1 flex-wrap h-[24px] overflow-x-scroll overflow-y-hidden rounded-full`}
          >
            {result?.map((i, index) => {
              return (
                <p
                  className={`${
                    index === 0
                      ? "text-[#e66a81] bg-black "
                      : index % 2 == 0
                      ? "text-purple-500 bg-black"
                      : index % 3 === 0
                      ? "text-[#01F7F7] bg-black"
                      : "text-amber-600 bg-black"
                  } rounded-full px-2 text-[10px] overscroll-auto scroll-smooth`}
                >
                  {i?.result} X
                </p>
              );
            })}
          </div>
          <AirPlane formik={formik} />
        </div>
        {/* // left section */}
        <div
          className={`w-[100%] lg:w-[25%] lg:h-[450px] h-[500px] ${gray} px-2 border-2 border-black rounded-lg`}
        >
          <div className="flex justify-center w-full">
          <Tabs
  value={value}
  onChange={handleChange}
  aria-label="basic tabs example"
  className="!text-sm !flex !justify-center"
  classes={{ indicator: 'custom-tab-indicator' }} // Add this line to apply custom styling
>
  {["All Bets", "My Bets", "Top"]?.map((i, index) => (
    <Tab
      label={i}
      {...a11yProps(index)}
      className="!text-sm !text-white"
    />
  ))}
</Tabs>
          </div>
          {(value === 0 && <AllBets formik={formik} />) ||
            (value === 1 && <MyBets />) ||
            (value === 2 && <Top />)}
        </div>
      </div>

      {anchorEl && (
        <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      )}
    </div>
  );
};

export default PlayGame;
