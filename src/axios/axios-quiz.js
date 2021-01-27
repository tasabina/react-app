import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-app-2d52e-default-rtdb.firebaseio.com/'
})