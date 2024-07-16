import userSlice from "../redux/actions/userSlice";
import cartSlice from "./actions/cartSlice";
import radioBtnSlice from "./actions/radioBtnSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        users: userSlice,
        radio: radioBtnSlice,
        cartItems: cartSlice,
    }
});

export default store
