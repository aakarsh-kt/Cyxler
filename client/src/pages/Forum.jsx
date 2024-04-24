import React, { useState } from "react";
import NavBar from "../components/NavBar";
// Forum component
import { questionCollection,db } from "../firebase";
import { addDoc,doc,getDoc,onSnapshot, updateDoc } from "firebase/firestore";
const Forum = () => {
  // State for storing questions and answers
  const [questions, setQuestions] = useState([
    // { id: 1, title: "How to learn React?", answers: [] },
    // { id: 2, title: "What is the best IDE for web development?", answers: [] },
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  React.useEffect(() => {
    const unsubscribe = onSnapshot(questionCollection, function (snapshot) {
      const questionArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setQuestions(questionArray);
    });

    return unsubscribe;
  }, []);
  // Function to handle submitting a new question
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim() === "") return;

    const newQuestionObj = {
      id: questions.length + 1,
      title: newQuestion,
      answers: [],
    };

    setQuestions([newQuestionObj, ...questions]);
    setNewQuestion("");
    const ref=addDoc(questionCollection,newQuestionObj);
  };
  
  const [upQuestion,setUpQuestion]=React.useState(null);
  // Function to handle submitting a new answer
  const handleAnswerSubmit = async (e, questionId, answer) => {
    e.preventDefault();
    const updatedQuestions =  questions.map((question) => {
      if (question.id === questionId) {
        console.log(
          "Question found",
        );
        const ref=doc(db,questionCollection,question.id);
         try{
      setUpQuestion({...question,answers:[...question.answers,answer]});
          updateDoc(ref,upQuestion);
        }catch(e){
          console.error(e);
        }
        return {
          ...question,
          answers: [...question.answers, answer],
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
    
  };

  return (
    <>
    <NavBar/>
    <div className="forum-container">

      <h1 className="forum-header">Forum</h1>

      {/* Form to submit a new question */}
      <form onSubmit={handleQuestionSubmit} className="question-form">
        <input
          type="text"
          placeholder="Ask a question..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="question-input"
        />
        <button type="submit" className="question-submit-button">
          Submit
        </button>
      </form>

      {/* Display questions and answers */}
      <div className="questions-container">
        {questions.map((question) => (
          <div key={question.id} className="question-card">
            <h3 className="question-title">{question.title}</h3>

            {/* Form to submit a new answer */}
            <form
              onSubmit={(e) => handleAnswerSubmit(e, question.id, "New answer")}
              className="answer-form"
            >
              <input
                type="text"
                placeholder="Your answer..."
                className="answer-input"
              />
              <button type="submit" className="answer-submit-button">
                Submit
              </button>
            </form>

            {/* Display answers */}
            <ul className="answer-list">
              {question.answers.map((answer, index) => (
                <li key={index} className="answer-item">
                  {answer}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Forum;
