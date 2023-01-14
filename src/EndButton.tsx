import {
  selectPermissions,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";

const EndRoomButton: React.FC = () => {
  const permissions = useHMSStore(selectPermissions);
  const hmsActions = useHMSActions();

  const endRoom = async () => {
    try {
      const lock = false; // set to true to disallow rejoins
      const reason = "party is over";
      await hmsActions.endRoom(lock, reason);
    } catch (error) {
      // Permission denied or not connected to room
      console.error(error);
    }
  };

  return permissions!.endRoom ? (
    <button onClick={endRoom}>End Room</button>
  ) : null;
};

export default EndRoomButton;
