import { FETCH_ROOM } from "@/lib/constants/query";
import { fetchRoomFromRealtimeDB } from "@/lib/firebase/firestoreFunctions";
import { useAppDispatch, useGameStore } from "@/redux/hooks";
import { gameActions } from "@/redux/slices/transactions-slice";
import { Room } from "@/types/room";
import { useQuery } from "@tanstack/react-query";

const useFetchRoom = (dependsOn: boolean = true) => {
  const { roomCode } = useGameStore();
  const dispatch = useAppDispatch();
  async function fetchRoom() {
    if (roomCode) {
      const data: Room = await fetchRoomFromRealtimeDB(roomCode.toString());
      dispatch(gameActions.setRoom(data));
      return data;
    }
    return dispatch(gameActions.setRoom(null));
  }

  return useQuery({
    queryKey: [FETCH_ROOM],
    queryFn: fetchRoom,
    enabled: dependsOn,
    refetchInterval: 1000,
  });
};

export default useFetchRoom;
