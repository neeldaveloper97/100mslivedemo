import React from "react";
import { useHMSActions } from "@100mslive/react-sdk";

const LeaveButton: React.FC = () => {
  const hmsActions = useHMSActions();
  return (
    <div>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          hmsActions.leave();
        }}
      >
        Leave
      </button>
    </div>
  );
};

export default LeaveButton;
