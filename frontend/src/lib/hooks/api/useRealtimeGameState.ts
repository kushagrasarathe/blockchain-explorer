import { database } from "@/lib/firebase/firebase";
import { Room } from "@/types/room";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useRealTimeGameState = (roomCode: string) => {
  const [gameState, setGameState] = useState<any>(null);

  useEffect(() => {
    if (roomCode) {
      const roomRef = doc(database, "rooms", roomCode);
      const getSnapshot = async () => {
        const snapshot = await getDoc(roomRef);
        if (snapshot.exists()) {
          setGameState(snapshot.data());
          return snapshot.data() as Room;
        }
        return;
      };

      getSnapshot();
      //   return () => getSnapshot();

      //   const gameRef = ref(realtimeDb, `rooms/${roomCode}`);
      //   const unsubscribe = onValue(gameRef, (snapshot) => {
      //     const data = snapshot.val();
      //     if (data) {
      //       setGameState(data);
      //     }
      //   });
      //   return () => unsubscribe();
    }
  }, [roomCode]);

  return gameState;
};
