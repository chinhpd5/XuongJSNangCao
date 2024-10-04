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
        // 1. tráo câu hỏi
        list = this.random(list);
        // 2. duyệt qua mảng câu hỏi
        const questionItem = list?.map((item,index)=>{
            // render các câu trả lời
            const listAnswers = this.renderAnswers(item.answers,item.type,item.id);
            // console.log(listAnswers);
            // 3. Thay đổi nội dung câu hỏi
            return `
                <div class="question_item border border-2 rounded p-4 mb-2">
                    <h4 class="question_number">Câu hỏi: ${index+1}</h4>
                    <h5 class="question_title">
                       ${item.questionTiltle}
                    </h5>
                    <div class="answer_items mt-3">
                       ${listAnswers}
                    </div>
                </div>
            `
        }).join("");

        document.getElementById('question_container').innerHTML = questionItem
        
    },
    renderAnswers: function(listAnswers,type,idQuestion){
        //listAnswers: danh sách câu trả lời
        // type: kiểu câu hỏi 1: radio, 2: checkbox
        //idQuestion: id của câu hỏi

        // 1. tráo câu trả lời
        listAnswers= this.random(listAnswers);
        // 2. duyệt qua mảng câu trả lời
        return listAnswers?.map((ans,index)=>{
            return `
                <div class="form-check fs-5 mb-3">
                    <input class="form-check-input border border-2 border-primary" role="button" 
                        type="${type == 1 ? 'radio': 'checkbox'}" 
                        name="question_${idQuestion}" 
                        id="answer_${idQuestion}_${ans.id}" >

                    <label class="form-check-label" role="button" for="answer_${idQuestion}_${ans.id}" >
                        ${ans.answerTitle}
                    </label>
                </div>
            `
        }).join("")
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