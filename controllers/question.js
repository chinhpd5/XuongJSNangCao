import {getQuizById} from '../services/api.js'

const app ={
    getQuizandQuestion: async function(){

        // 1. Lấy id trên url http://127.0.0.1:5501/question.html?id=abcd
        const searchParam = new URLSearchParams(window.location.search);

        // console.log(searchParam);
        if(searchParam.has('id')){
            const id = searchParam.get('id');
            // console.log(id);
            const dataQuiz = await getQuizById(id)
            console.log(dataQuiz);
            this.renderQuizInfo(dataQuiz)
            
        }
        

    },
    renderQuizInfo: function(data){
        document.getElementById('quiz_heading').innerHTML = data.title;
        document.getElementById('quiz_description').innerHTML = data.description;

    },

    start: function(){
        this.getQuizandQuestion();
    }
}

app.start();