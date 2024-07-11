import { reducer } from "../Redux/reducer.js"
import { configureStore, createStore } from "@reduxjs/toolkit";

export const store= createStore(reducer)