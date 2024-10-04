import {getQuizById,getQuestionsByIdQuiz} from '../services/api.js'
var listQuestion=[];
const app ={
    getQuizandQuestion: async function(){

        // 1. Lấy id trên url http://127.0.0.1:5501/question.html?id=abcd
        const searchParam = new URLSearchParams(window.location.search);

        // console.log(searchParam);
        if(searchParam.has('id')){
            const id = searchParam.get('id');
            // console.log(id);
            // Phần 1: thông tin quiz
            // 2. Lấy dữ liệu Quiz theo id của quiz
            const dataQuiz = await getQuizById(id)
            // console.log(dataQuiz);

            // 3. Hiển thị thông tin quiz qua giao diện
            this.renderQuizInfo(dataQuiz);

            // ===================================

            // Phần 2: Thông tin question:
            listQuestion = await getQuestionsByIdQuiz(id);
            this.renderListQuestion(listQuestion);
        }
        

    },
    renderQuizInfo: function(data){
        document.getElementById('quiz_heading').innerHTML = data.title;
        document.getElementById('quiz_description').innerHTML = data.description;

    },

    renderListQuestion: function(list){
        // console.log(list);
        list = this.random(list)
        console.log(list);
    
        
    },
    random: function(array){
        return array.sort(()=>{
            return Math.random() - Math.random();
        })
    },

    start: function(){
        this.getQuizandQuestion();
    }
}

app.start();