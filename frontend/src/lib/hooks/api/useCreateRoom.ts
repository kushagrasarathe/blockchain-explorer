import { createRoomInFirestore } from "@/lib/firebase/firestoreFunctions";
import { useMutation } from "@tanstack/react-query";

const useCreateRoom = () => {
  async function createRoom(data: {
    roomCode: string;
    playerName: string;
    gameSet: number;
  }) {
    createRoomInFirestore(data.roomCode, data.playerName, data.gameSet);
  }

  async function onSuccess() {
    // todo: add toast notification
  }

  async function onError() {
    // todo: add toast notification
  }

  return useMutation({
    mutationFn: createRoom,
    onSuccess,
    onError,
  });
};

export default useCreateRoom;
