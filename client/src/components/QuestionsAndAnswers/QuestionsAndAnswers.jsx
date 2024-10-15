import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./QuestionsAndAnswers.css";
import SearchQuestion from "./SearchQuestion.jsx";
import QuestionForm from "./QuestionForm.jsx";
import AnswerForm from "./AnswerForm.jsx";

const QuestionsAndAnswers = ({ productId }) => {
  const [qaList, setQuestionsAndAns] = useState([]);
  const [visibleQuestions, setVisibleQuestions] = useState(2);
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showQuestionForm, setShowAddQuestionForm] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [questionData, setNewQuestionData] = useState({
    body: "",
    name: "",
    email: "",
  });
  const [ansData, setNewAnswerData] = useState({
    body: "",
    name: "",
    email: "",
  });
  const [votedQA, setvotedQA] = useState({
    questions: new Set(),
    answers: new Set(),
  });

  const params = {
    product_id: productId,
    page: 1,
    count: 100,
  };

  useEffect(() => {
    fetchQA();
  }, []);

  const updateQA = (id, type) => {
    setvotedQA((prev) => {
      const newVotedQA = { ...prev };
      type === 'questions' ? newVotedQA.questions.add(id) : newVotedQA.answers.add(id);
      return newVotedQA;
    });
  };


  const fetchQA = () => {
    axios
      .get(`/qa/questions/`, { params })
      .then((res) => setQuestionsAndAns(res.data.results))
      .catch((e) => console.error(e));
  };

  const toggleAnswers = (questionId, totalAnswers) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [questionId]: prev[questionId] === totalAnswers ? 2 : totalAnswers,
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const questionsBody = qaList.filter((qa) =>
    qa.question_body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkQuestionHelpful = (id) => {
    if (votedQA.questions.has(id)) return;
    axios
      .put(`/qa/questions/${id}/helpful`)
      .then(() => {
        updateQA(id, 'questions');
        fetchQA();
      })
      .catch((e) => console.error(e));
  };

  const handleMarkAnsHelpful = (id) => {
    if (votedQA.answers.has(id)) return;
    axios
      .put(`/qa/answers/${id}/helpful`)
      .then(() => {
        updateQA(id, 'answers');
        fetchQA();
      })
      .catch((e) => console.error(e));
  };

  const handleAnsReport = (id) => {
    axios
      .put(`/qa/answers/${id}/report`)
      .then(() => fetchQA())
      .catch((e) => console.error(e));
  };

  const handleQuestionReport = (id) => {
    axios
      .put(`/qa/questions/${id}/report`)
      .then(() => fetchQA())
      .catch((e) => console.error(e));
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const questionBody = {
      body: questionData.body,
      name: questionData.name,
      email: questionData.email,
      product_id: productId,
    };

    axios
      .post(`/qa/questions`, questionBody)
      .then(() => {
        fetchQA();
        setShowAddQuestionForm(false);
      })
      .catch((e) => console.error(e));
  };

  const handleAddAnswer = (e) => {
    e.preventDefault();
    const ansBody = {
      body: ansData.body,
      name: ansData.name,
      email: ansData.email,
      product_id: productId,
    };
    axios
      .post(`/qa/questions/${currentQuestionId}/answers`, ansBody)
      .then(() => {
        fetchQA();
        setCurrentQuestionId(null);
      })
      .catch((e) => console.error(e));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAnswerChange = (e) => {
    const { name, value } = e.target;
    setNewAnswerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="qa-section">
      <h1>Questions & Answers</h1>
      <SearchQuestion searchTerm={searchTerm} handleSearch={handleSearch} />

      <div className="questions-list">
        {questionsBody.length === 0 ? (
          <p>Loading...</p>
        ) : (
          questionsBody.slice(0, visibleQuestions).map((qa, index) => {
            const answersArray = Object.values(qa.answers);
            const visibleCount = visibleAnswers[qa.question_id] || 2;
            return (
              <div className="qa-item" key={index}>
                <div className="question-actions">
                  <h3>Q: {qa.question_body}</h3>
                  <div>
                    <span>
                      Helpful?
                      <a
                        href="#"
                        onClick={() =>
                          handleMarkQuestionHelpful(qa.question_id)
                        }
                        >
                        Yes ({qa.question_helpfulness})
                      </a>
                    </span>
                    <a
                      href="#"
                      onClick={() => handleQuestionReport(qa.question_id)}
                      >
                      Report
                    </a>
                    <button
                      onClick={() => setCurrentQuestionId(qa.question_id)}
                      >
                      Add Answer
                    </button>
                  </div>
                </div>

                {answersArray.slice(0, visibleCount).map((answer, idx) => (
                  <div key={idx} className="answer">
                    <p>A: {answer.body}</p>
                    <div className="answer-info">
                      <span>
                        by
                        {answer.answerer_name === "Seller" ? (
                          <b>Seller</b>
                        ) : (
                          answer.answerer_name
                        )}
                        , {format(new Date(answer.date), "MM/dd/yyyy")}
                      </span>
                      <div className="actions">
                        <span>
                          Helpful?
                          <a
                            href="#"
                            onClick={() => handleMarkAnsHelpful(answer.id)}
                          >
                            Yes ({answer.helpfulness})
                          </a>
                        </span>
                        <a href="#" onClick={() => handleAnsReport(answer.id)}>
                          Report
                        </a>
                      </div>
                    </div>
                  </div>
                ))}

                {answersArray.length > 2 && (
                  <button
                    onClick={() =>
                      toggleAnswers(qa.question_id, answersArray.length)
                    }
                  >
                    See more answers
                  </button>
                )}

                {currentQuestionId === qa.question_id && (
                  <AnswerForm
                    productId={productId}
                    currentQuestionId={currentQuestionId}
                    handleAddAnswer={handleAddAnswer}
                    handleAnswerChange={handleAnswerChange}
                    ansData={ansData}
                    setCurrentQuestionId={setCurrentQuestionId}
                    questionData={questionData}
                  />
                )}
              </div>
            );
          })
        )}
      </div>

      {questionsBody.length > visibleQuestions && (
        <button
          className="more-questions"
          onClick={() => setVisibleQuestions(visibleQuestions + 2)}
        >
          More Answered Questions
        </button>
      )}

      <div className="bottom-buttons">
        <button
          className="add-question"
          onClick={() => setShowAddQuestionForm(true)}
        >
          Add a Question
        </button>
      </div>

      {showQuestionForm && (
        <QuestionForm
          productId={productId}
          handleInputChange={handleInputChange}
          handleAddQuestion={handleAddQuestion}
          setShowAddQuestionForm={setShowAddQuestionForm}
          questionData={questionData}
          setNewQuestionData={setNewQuestionData}
        />
      )}
    </div>
  );
};

export default QuestionsAndAnswers;
