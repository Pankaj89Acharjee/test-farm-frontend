import axios from "axios"
const { default: axiosInstance } = require(".")


export const registerNewUser = async (payload) => {
    // console.log("PAYLOAD is", payload)
    try {
        const registerNewUser = await axiosInstance.post("/api/user/registerNewUser", payload)
        return registerNewUser.data
    } catch (error) {
        console.log("Error in registering a new user")
        return error.message
    }
}

// export const checkUserExists = async (email) => {
//     //console.log("PAYLOAD is", email)
//     try {
//         const findUser = await axiosInstance.post("/api/user/checkUserExists", {email})
//         return findUser.data
//     } catch (error) {
//         console.log("Error in finding the user")
//         return error.message
//     }
// }

export const getAllExamDataForUser = async () => {
    try {
        const getExamData = await axiosInstance.get("/api/user/getAllExamDataForUser")
        return getExamData.data
    } catch (error) {
        console.log("Error in registering a new user")
        return error.message
    }
}

export const getExamDetailsForUser = async (payload) => {
    // console.log("Payload is", payload)
    try {
        const getDetails = await axiosInstance.post(`/api/user/getExamDataByIdForUser/${payload}`)
        return getDetails.data
    } catch (error) {
        console.log("Error in registering a new user")
        return error.message
    }
}


export const getAllQuestionsByExamId = async (payload) => {
    try {
        const getQuestions = await axiosInstance.post(`/api/user/getAllQuestionsByExamId`, payload)
        return getQuestions.data
    } catch (error) {
        console.log("Error in getting all the questions", error)
        return error.message
    }
}


export const saveQuestionAttempts = async (payload) => {
    try {
        const saveAttempts = await axiosInstance.post(`/api/user/addNewQsAttemptReport`, payload)
        return saveAttempts.data
    } catch (error) {
        console.log("Error in getting all the questions", error)
        return error.message
    }
}


export const getAllExamAttempts = async (payload) => {
    try {
        const getAttempts = await axiosInstance.post(`/api/user/getQuestionsAttemptByUser`, payload)
        return getAttempts.data
    } catch (error) {
        console.log("Error in getting all the questions", error)
        return error.message
    }
}

export const getOrderHistory = async (payload) => {
    try {
        const getOrders = await axiosInstance.post(`/api/user/getAllOrders`, payload)
        return getOrders.data
    } catch (error) {
        console.log("Error in fetching orders", error)
        return error.message
    }
}


// export const saveCartItemsInDB = async (payload) => {
//     console.log("Payload os", payload)
//     try {
//         const saveItems = await axiosInstance.post(`/api/user/saveCartItems`, payload)
//         return saveItems.data
//     } catch (error) {
//         console.log("Error in fetching orders", error)
//         return error.message
//     }
// }

export const sendCartDataToDatabase = async (cartItemsData) => {
    await axios.post(`http://localhost:5075/api/user/saveCartItems`, {
        cartItems: cartItemsData,
    })
    //console.log("After saving data in cart", sentCartItemsToDB)
}