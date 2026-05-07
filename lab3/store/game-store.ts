import { create } from 'zustand';

interface GameState {
  score: number;
  tapCount: number;
  doubleTapCount: number;
  longPressDone: boolean;
  panDone: boolean;
  swipeRightDone: boolean;
  swipeLeftDone: boolean;
  pinchDone: boolean;

  addScore: (points: number) => void;
  incrementTap: () => void;
  incrementDoubleTap: () => void;
  setLongPressDone: () => void;
  setPanDone: () => void;
  setSwipeRightDone: () => void;
  setSwipeLeftDone: () => void;
  setPinchDone: () => void;
  reset: () => void;
}

const initialState = {
  score: 0,
  tapCount: 0,
  doubleTapCount: 0,
  longPressDone: false,
  panDone: false,
  swipeRightDone: false,
  swipeLeftDone: false,
  pinchDone: false,
};

export const useGameStore = create<GameState>((set) => ({
  ...initialState,

  addScore: (points) => set((state) => ({ score: state.score + points })),
  incrementTap: () => set((state) => ({ tapCount: state.tapCount + 1 })),
  incrementDoubleTap: () => set((state) => ({ doubleTapCount: state.doubleTapCount + 1 })),
  setLongPressDone: () => set({ longPressDone: true }),
  setPanDone: () => set({ panDone: true }),
  setSwipeRightDone: () => set({ swipeRightDone: true }),
  setSwipeLeftDone: () => set({ swipeLeftDone: true }),
  setPinchDone: () => set({ pinchDone: true }),
  reset: () => set(initialState),
}));
