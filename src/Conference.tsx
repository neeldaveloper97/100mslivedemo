import {
  HMSPeer,
  selectPeers,
  selectPeerScreenSharing,
  selectScreenShareByPeerID,
  useHMSStore,
  useVideo,
} from "@100mslive/react-sdk";
import React, { useEffect } from "react";
import Peer from "./Peer";
import { useHMSActions } from "@100mslive/react-sdk";

const Conference: React.FC = () => {
  const hmsActions = useHMSActions();
  const peers = useHMSStore<HMSPeer[]>(selectPeers);
  const presenter = useHMSStore(selectPeerScreenSharing);
  const screen = useHMSStore(selectScreenShareByPeerID(presenter?.id));

  const screenRef = React.createRef<HTMLVideoElement>();

  useEffect(() => {
    (async () => {
      console.log(screenRef.current);
      console.log(screen);
      if (screenRef.current && screen) {
        if (screen.enabled) {
          await hmsActions.attachVideo(screen.id, screenRef.current);
        } else {
          await hmsActions.detachVideo(screen.id, screenRef.current);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  return (
    <div className="conference-section">
      <h2>Conference</h2>

      <div className="peers-container">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>
      <div className="peers-container">
        {presenter && (
          <video
            ref={screenRef}
            // className={`peer-video ${peer.isLocal ? "local" : ""}`}
            // className={` ${isLocal ? "You are sharing your screen" : ""}`}
            autoPlay
            muted={false}
            playsInline
          />
        )}
      </div>
    </div>
  );
};

export default Conference;
