import { updateRoomInFirestore } from "@/lib/firebase/firestoreFunctions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useUpdateRoom = () => {
  const router = useRouter();

  async function updateRoom(data: { roomCode: string; updateData: object }) {
    updateRoomInFirestore(data.roomCode, data.updateData);
  }

  async function onSuccess() {
    // todo: add toast notification
  }

  async function onError() {
    // todo: add toast notification
  }

  return useMutation({
    mutationFn: updateRoom,
    onSuccess,
    onError,
  });
};

export default useUpdateRoom;
