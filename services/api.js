export const getAllQuiz = async ()=>{
    try {
        // call api lấy danh sách quiz
        const res = await fetch('http://localhost:3000/quizs'); // call api:bất đồng bộ
        const data = await res.json()
        // console.log(data); // đồng bộ
        return data;
    } catch (error) {
        alert("Lỗi")
    }
}

export const getQuestionsByIdQuiz = async(idQuiz)=>{
    try {
        // call api lấy danh sách question(câu hỏi theo id của quiz)
        const res = await fetch(`http://localhost:3000/questions?quizId=${idQuiz}`); // call api:bất đồng bộ
        const data = await res.json()
        // console.log(data); // đồng bộ
        return data;
    } catch (error) {
        alert("Lỗi")
    }
}

export const getQuizById = async (id) =>{
    try {
        // trả về 1 object chứa id theo điều kiện
        const res = await fetch(`http://localhost:3000/quizs/${id}`)
        const data = await res.json();
        return data
    } catch (error) {
        alert(error)
    }
}