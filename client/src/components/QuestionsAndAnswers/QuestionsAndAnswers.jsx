import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./QuestionsAndAnswers.css";
import SearchQuestion from "./SearchQuestion.jsx";
import QuestionForm from "./QuestionForm.jsx";
import AnswerForm from "./AnswerForm.jsx";
import AnswerEntry from "./AnswerEntry.jsx";
import Modal from "./Modal.jsx";

const QuestionsAndAnswers = ({ productId }) => {
  const [qaList, setQuestionsAndAns] = useState([]);
  const [visibleQuestions, setVisibleQuestions] = useState(2);
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showQuestionForm, setShowAddQuestionForm] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [questionData, setNewQuestionData] = useState({
    body: "",
    name: "",
    email: "",
    photos: [],
  });
  const [ansData, setNewAnswerData] = useState({
    body: "",
    name: "",
    email: "",
    photos: [],
  });
  const [votedQA, setvotedQA] = useState({
    questions: [],
    answers: [],
  });
  const [reportedQA, setReportedQA] = useState({
    questions: JSON.parse(localStorage.getItem('reportedQuestions')) || [],
    answers: JSON.parse(localStorage.getItem('reportedAnswers')) || [],
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
      if (type === "questions") {
        if (!newVotedQA.questions.includes(id)) {
          newVotedQA.questions.push(id);
        }
      } else {
        if (!newVotedQA.answers.includes(id)) {
          newVotedQA.answers.push(id);
        }
      }
      return newVotedQA;
    });
  };

  const updateReportedQA = (id, type) => {
    setReportedQA((prev) => {
      const newReportedQA = { ...prev };
      if (type === "questions") {
        if (!newReportedQA.questions.includes(id)) {
          newReportedQA.questions.push(id);
          localStorage.setItem('reportedQuestions', JSON.stringify(newReportedQA.questions));
        }
      } else {
        if (!newReportedQA.answers.includes(id)) {
          newReportedQA.answers.push(id);
          localStorage.setItem('reportedAnswers', JSON.stringify(newReportedQA.answers));
        }
      }
      return newReportedQA;
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
    if (votedQA.questions.includes(id)) return;
    axios
      .put(`/qa/questions/${id}/helpful`)
      .then(() => {
        updateQA(id, "questions");
        // fetchQA();
      })
      .catch((e) => console.error(e));
  };

  const handleMarkAnsHelpful = (id) => {
    if (votedQA.answers.includes(id)) return;
    axios
      .put(`/qa/answers/${id}/helpful`)
      .then(() => {
        updateQA(id, "answers");
        // fetchQA();
      })
      .catch((e) => console.error(e));
  };

  const handleAnsReport = (id) => {
    axios
      .put(`/qa/answers/${id}/report`)
      .then(() => {
        updateReportedQA(id, "answers");
        // fetchQA();
      })
      .catch((e) => console.error(e));
  };

  const handleQuestionReport = (id) => {
    if (reportedQA.questions.includes(id)) return;
    axios
      .put(`/qa/questions/${id}/report`)
      .then(() => {
        updateReportedQA(id, "questions");
      })
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
      photos: ansData.photos,
      product_id: productId,
    };
    axios
      .post(`/qa/questions/${currentQuestionId}/answers`, ansBody)
      .then(() => {
        fetchQA();
        setCurrentQuestionId(null);
        setShowAnswerForm(false);
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

  const handleImageUpload = (e) => {};

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
                      {votedQA.questions.includes(qa.question_id) ? (
                        <p>Yes</p>
                      ) : (
                        <a
                          className="link"
                          onClick={() =>
                            handleMarkQuestionHelpful(qa.question_id)
                          }
                        >
                          Yes ({qa.question_helpfulness})
                        </a>
                      )}
                    </span>
                    {reportedQA.questions.includes(qa.question_id) ? (
                      <span>Reported</span>
                    ) : (
                      <a
                        className="link"
                        onClick={() => handleQuestionReport(qa.question_id)}
                      >
                        Report
                      </a>
                    )}

                    <a
                      className="link"
                      onClick={() => {
                        console.log("Add Answer clicked for question ID:", qa.question_id);
                        setCurrentQuestionId(qa.question_id);
                        setShowAnswerForm(true);
                      }}
                    >
                      Add Answer
                    </a>
                  </div>
                </div>

                {answersArray.slice(0, visibleCount).map((answer, idx) => (
                  <AnswerEntry
                    key={idx}
                    answer={answer}
                    handleMarkAnsHelpful={handleMarkAnsHelpful}
                    handleAnsReport={handleAnsReport}
                    reportedQA={reportedQA}
                  />
                ))}

                {answersArray.length > 2 && (
                  <a
                    className="link-more-ans"
                    onClick={() =>
                      toggleAnswers(qa.question_id, answersArray.length)
                    }
                  >
                    {visibleCount === answersArray.length
                      ? "COLLAPSE ANSWERS"
                      : "LOAD MORE ANSWERS"}
                  </a>
                )}

                {currentQuestionId === qa.question_id && (
                  <Modal
                    isOpen={showAnswerForm}
                    onClose={() => setShowAnswerForm(false)}
                  >
                    <AnswerForm
                      productId={productId}
                      currentQuestionId={currentQuestionId}
                      handleAddAnswer={handleAddAnswer}
                      handleAnswerChange={handleAnswerChange}
                      ansData={ansData}
                      setCurrentQuestionId={setCurrentQuestionId}
                      handleImageUpload={handleImageUpload}
                    />
                  </Modal>
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
        <Modal
          isOpen={showQuestionForm}
          onClose={() => setShowAddQuestionForm(false)}
        >
          <QuestionForm
            productId={productId}
            handleInputChange={handleInputChange}
            handleAddQuestion={handleAddQuestion}
            setShowAddQuestionForm={setShowAddQuestionForm}
            questionData={questionData}
            setNewQuestionData={setNewQuestionData}
          />
        </Modal>
      )}
    </div>
  );
};

export default QuestionsAndAnswers;