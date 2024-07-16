import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import axios from 'axios'
import { sendCartDataToDatabase } from '../../apicalls/usersapicall'




const cartSlice = createSlice({
    name: 'addtocart',
    initialState: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [], //Initializing an empty array
        totalCartItems: 0,
        totalAmountCartItems: 0
    },
    reducers: {
        AddToCart: (state, action) => {
            //Logic to check whether the same product has been added again or a new one. If existing product has been added, then we need to increment the quantity by 1, otherwise it would add a new item in the array.

            //For this, finding index of the added product in the cart. If added already, it would return 0 or > 0, if not then -1
            const existingItemIndex = state.cartItems.findIndex((item) => item.productId === action.payload.productId)

            if (existingItemIndex !== -1) { //If item already exists in the cart, increase index by 1
                message.success(`${action.payload.productName} added additionally to cart`)
                // state.cartItems[existingItemIndex].quantity += 1
                const updatedCartItems = state.cartItems.map((item, index) => {
                    if (index === existingItemIndex) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
                state.cartItems = updatedCartItems;
                //message.success(`${productName} added additionally to cart`);
            } else {
                // state.cartItems.push({ ...action.payload, quantity: 1 }) //The Spread Operator is used to keep the previous state value
                const newItem = { ...action.payload, quantity: 1 };
                state.cartItems = [...state.cartItems, newItem];
                message.success(`${action.payload.productName} added to cart`);
               
            }

            //Update totalCartItems
            state.totalCartItems = state.cartItems.reduce((total, item) => total + item.quantity, 0)

            //Store cart items in the local storage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            
            sendCartDataToDatabase(state.cartItems)
        },


        RemoveCartItems: (state, action) => {
            const newCartItems = state.cartItems.filter((item) => item.productId !== action.payload.productId)
            state.cartItems = newCartItems
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            message.info(`${action.payload.productName} removed from the cart`)
        },


        ClearCartItems: (state, action) => {
            state.cartItems = []
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            message.info(`All cart items removed from the cart`)
        }
    }
})


export const { AddToCart, RemoveCartItems, ClearCartItems } = cartSlice.actions
export default cartSlice.reducer