import React, { useEffect, useState } from "react";
import "./App.css";
import JoinForm from "./JoinForm";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import Conference from "./Conference";
import Footer from "./Footer";
import EndRoomButton from "./EndButton";
import Notification from "./Notification";
import LeaveButton from "./LeaveButton";

const App: React.FC = () => {
  const isConnected = useHMSStore<boolean | undefined>(selectIsConnectedToRoom);

  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  const shareScreen = async () => {
    try {
      await hmsActions.setScreenShareEnabled(true);
    } catch (e: any) {
      console.log(e);
      debugger;
    } finally {
      // setScreenRecording(true);
    }
  };

  const stopScreenShare = async () => {
    try {
      await hmsActions.setScreenShareEnabled(false);
      debugger;
    } catch (e: any) {
      console.log(e);
      debugger;
    } finally {
      // setScreenRecording(false);
    }
  };

  return (
    <div>
      {isConnected ? (
        <>
          <Conference />
          <Footer />
          <LeaveButton />
          <EndRoomButton />
          <Notification />
          <button onClick={() => shareScreen()}>Share Screen</button>
          <button onClick={() => stopScreenShare()}>Stop Sharing screen</button>
        </>
      ) : (
        <JoinForm />
      )}
    </div>
  );
};

export default App;
