import {createSlice} from '@reduxjs/toolkit'

const radioBtnSlice = createSlice({
    name: 'radiobtn',
    initialState: {
        selectedValue: null
    },
    reducers: {
        SetDays: (state, action) => {
            state.selectedValue = action.payload
        }
    }
})

export const {SetDays} = radioBtnSlice.actions
export default radioBtnSlice.reducer