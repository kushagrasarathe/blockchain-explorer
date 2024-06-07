import { FETCH_ROOM } from "@/lib/constants/query";
import { playerMove } from "@/lib/firebase/firestoreFunctions";
import { Room } from "@/types/room";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useMakeMove = (roomCode: string) => {
  const queryClient = useQueryClient();

  async function playerTurn(data: Partial<Room>) {
    playerMove(roomCode, data);
  }

  async function onSuccess() {
    // todo: add toast notification
    queryClient.invalidateQueries({ queryKey: [FETCH_ROOM] });
  }

  async function onError() {
    // todo: add toast notification
  }

  return useMutation({
    mutationFn: playerTurn,
    onSuccess,
    onError,
  });
};

export default useMakeMove;
