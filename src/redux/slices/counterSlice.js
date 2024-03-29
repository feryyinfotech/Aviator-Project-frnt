import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "aviator",
  initialState: {
    value: 0,
    // by user enabling and dissabling music and sound
    isEnableMusic:false,
    isEnableSound:false,
    // by timing enabling and dissabling music and sound
    byTimeEnablingMusic:false,
    byTimeEnablingSound:false,
    backgroundImage_url:localStorage.getItem("bg_image")||"https://res.cloudinary.com/do7kimovl/image/upload/v1708942319/cloud5_kwar8w.jpg",
    backgroundMusic_url:localStorage.getItem("bg_music")||"https://res.cloudinary.com/do7kimovl/video/upload/v1709029785/bg_music_iiovsn.mp3"
  },
  reducers: {
    // main music and sound enabling and dessabling
    isEnableMusicFun: (state) => {
      state.isEnableMusic =!state.isEnableMusic;
    },
    isEnableSoundFun: (state) => {
      state.isEnableSound =!state.isEnableSound;
    },
    // by time enabling and dessabling music and sound
    byTimeIsEnableMusic: (state,actions) => {
      state.byTimeEnablingMusic =actions.payload
    },
    byTimeIsEnableSound: (state,actions) => {
      console.log("function  is sound enable is called",actions.payload)
      state.byTimeEnablingSound =actions.payload
    },
    backgroundImageFun: (state,actions) => {
      state.backgroundImage_url =actions.payload
    },
    backgroundMusicFun: (state,actions) => {
      state.backgroundMusic_url =actions.payload
    },
  },
});


export const {isEnableMusicFun,isEnableSoundFun,byTimeIsEnableMusic,byTimeIsEnableSound,backgroundImageFun,backgroundMusicFun } = slice.actions;

// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectCount = (state) => state.aviator.value;

export default slice.reducer;
