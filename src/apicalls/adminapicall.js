const { default: axiosInstance } = require('.')

export const addNewExam = async (payload) => {
    try {
        const regNewExam = await axiosInstance.post("/api/admin/addExam", payload)
        return regNewExam.data
    } catch (error) {
        console.log("Error in creating new exam")
        return error.message
    }
}

export const fetchAllExams = async () => {
    try {
        const fetchExam = await axiosInstance.get("/api/admin/getAllExamData")
        return fetchExam.data
    } catch (error) {
        console.log("Error in fetching exam", error)
        return error.message
    }
}

export const editExamById = async (payload) => {
    try {
        const editData = await axiosInstance.post(`/api/admin/getExamDataById/${payload}`)
        return editData.data
    } catch (error) {
        console.log("Error in fetching exam", error)
        return error.message
    }
}

export const updateExamById = async (payload) => {
    try {
        const updateExam = await axiosInstance.post(`/api/admin/editExamById/${payload.id}`, payload)
        return updateExam.data
    } catch (error) {
        console.log("Error in updating exam", error)
        return error.message
    }
}


export const deleteExamById = async (payload) => {
    try {
        const deleteExam = await axiosInstance.post(`/api/admin/deleteExamById`, payload)
        return deleteExam.data
    } catch (error) {
        console.log("Error in deleting exam", error)
        return error.message
    }
}


export const insertNewQuestion = async (payload) => {
    try {
        const insertQs = await axiosInstance.post(`/api/admin/addQuestions`, payload)
        return insertQs.data
    } catch (error) {
        console.log("Error in inserting new question", error)
        return error.message
    }
}


export const getAllQuestionsByExamId = async (payload) => {
    try {
        const getQuestions = await axiosInstance.post(`/api/admin/getAllQuestionsByExamId`, payload)
        return getQuestions.data
    } catch (error) {
        console.log("Error in getting all the questions", error)
        return error.message
    }
}


export const editQuestion = async (payload) => {
    try {
        const editQs = await axiosInstance.post(`/api/admin/editQuesByExamId`, payload)
        return editQs.data
    } catch (error) {
        console.log("Error in editing the question", error)
        return error.message
    }
}


export const deleteQuestion = async (payload) => {
    try {
        const deleteQs = await axiosInstance.post(`/api/admin/deleteQuestionById`, payload)
        return deleteQs.data
    } catch (error) {
        console.log("Error in deleting the question", error)
        return error.message
    }
}