import * as api from '../api/index'

export const askQuestion = (questionData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.postQuestion(questionData)
        dispatch({ type: "POST_QUESTION", payload: data})
        dispatch(fetchAllQuestions())
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllQuestions = () => async (disptach) => {
    try {
        const { data } = await api.getAllQuestions()
        disptach({ type: 'FETCH_ALL_QUESTIONS', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteQuestion = (id, navigate) => async (dispatch) => {
    try {
        await api.deleteQuestion(id)
        dispatch(fetchAllQuestions())
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const voteQuestion = (id, value) => async (dispatch) => {
    try {
        await api.voteQuestion(id, value)
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
}

export const postAnswer = (answerData) => async (dispatch) => {
    try {
        const { id, noOfAnswers, answerBody, userAnswered } = answerData;
        console.log("post action")
        const { data } = await api.postAnswer( id, noOfAnswers, answerBody, userAnswered )
        dispatch({ type: 'POST_ANSWER', payload: data})
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
}
export const addComment = (answerData) => async (dispatch) => {
    try {
        const { id, answerId, comment, userAnswered } = answerData;
        console.log(id,answerId,"actions");
        console.log(comment,userAnswered,"actions1");
        const { data } = await api.postComment( id, answerId, comment, userAnswered  )
        dispatch({ type: 'POST_COMMENT', payload: data})
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
    try {
        await api.deleteAnswer(id, answerId, noOfAnswers)
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
} 