import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState: {
        userall: null
    },
    reducers: {
        SetUser: (state, action) => {
            state.userall = action.payload
        }
    }
})

export const {SetUser} = userSlice.actions
export default userSlice.reducer