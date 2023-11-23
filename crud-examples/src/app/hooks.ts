import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Creating a custom hook for dispatching actions
export const useAppDispatch: () => AppDispatch = useDispatch;

// Creating a custom hook for selecting state from the store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
