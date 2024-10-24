import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./QuestionsAndAnswers.css";
import SearchQuestion from "./SearchQuestion.jsx";
import QuestionForm from "./QuestionForm.jsx";
import AnswerForm from "./AnswerForm.jsx";
import AnswerEntry from "./AnswerEntry.jsx";
import Modal from '../../components/sharedComponents/Modal.jsx';
import QAActions from "./QAActions.jsx";

const QuestionsAndAnswers = ({ productId }) => {
  const [qaList, setQuestionsAndAns] = useState([]);
  const [visibleQuestions, setVisibleQuestions] = useState(2);
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showQuestionForm, setShowAddQuestionForm] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [selectedQuestionId, setselectedQuestionId] = useState(null);
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
    questions: JSON.parse(localStorage.getItem("votedQuestions")) || [],
    answers: JSON.parse(localStorage.getItem("votedAnswers")) || [],
  });
  const [reportedQA, setReportedQA] = useState({
    questions: JSON.parse(localStorage.getItem("reportedQuestions")) || [],
    answers: JSON.parse(localStorage.getItem("reportedAnswers")) || [],
  });
  const params = {
    product_id: productId,
    page: 1,
    count: 10000000,
  };
  useEffect(() => {
    fetchQA();
  }, [productId]);

  const updateQA = (id, type) => {
    setvotedQA((prev) => {
      const newVotedQA = { ...prev };
      if (type === "questions") {
        if (!newVotedQA.questions.includes(id)) {
          newVotedQA.questions.push(id);
          localStorage.setItem(
            "votedQuestions",
            JSON.stringify(newVotedQA.questions)
          );
        }
      } else {
        if (!newVotedQA.answers.includes(id)) {
          newVotedQA.answers.push(id);
          localStorage.setItem(
            "votedAnswers",
            JSON.stringify(newVotedQA.answers)
          );
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
          localStorage.setItem(
            "reportedQuestions",
            JSON.stringify(newReportedQA.questions)
          );
        }
      } else {
        if (!newReportedQA.answers.includes(id)) {
          newReportedQA.answers.push(id);
          localStorage.setItem(
            "reportedAnswers",
            JSON.stringify(newReportedQA.answers)
          );
        }
      }
      return newReportedQA;
    });
  };

  const fetchQA = () => {
    axios
      .get(`/qa/questions/`, { params })
      .then((res) => setQuestionsAndAns(res.data.results))
      .catch(e => console.error(e));
  };

  const toggleQuestion = (questionId) => {
    setselectedQuestionId(prev => (prev === questionId ? null : questionId));
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
        setQuestionsAndAns((prev) => {
          const updatedQuestion = prev.map((question) => {
            if (question.question_id === id) {
              return {
                ...question,
                question_helpfulness: question.question_helpfulness + 1,
              };
            }
            return question;
          });
          return updatedQuestion;
        });
        updateQA(id, "questions");
      })
      .catch(e => console.error(e));
  };

  const handleMarkAnsHelpful = (id) => {
    if (votedQA.answers.includes(id)) return;
    axios
      .put(`/qa/answers/${id}/helpful`)
      .then(() => {
        setQuestionsAndAns((prev) => {
          const updatedAns = prev.map((question) => {
            const curAnswers = { ...question.answers };
            if (curAnswers[id]) {
              curAnswers[id] = {
                ...curAnswers[id],
                helpfulness: curAnswers[id].helpfulness + 1,
              };
            }
            return {
              ...question,
              answers: curAnswers,
            };
          });
          return updatedAns;
        });
        updateQA(id, "answers");
      })
      .catch(e => console.error(e));
  };

  const handleAnsReport = (id) => {
    axios
      .put(`/qa/answers/${id}/report`)
      .then(() => updateReportedQA(id, "answers"))
      .catch(e => console.error(e));
  };

  const handleQuestionReport = (id) => {
    if (reportedQA.questions.includes(id)) return;
    axios
      .put(`/qa/questions/${id}/report`)
      .then(() => updateReportedQA(id, "questions"))
      .catch(e => console.error(e));
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const questionBody = {
      ...questionData,
      product_id: productId,
    };

    axios
      .post(`/qa/questions`, questionBody)
      .then(() => {
        fetchQA();
        setShowAddQuestionForm(false);
      })
      .catch(e => console.error(e));
  };

  const handleAddAnswer = (e) => {
    e.preventDefault();
    const ansBody = {
      ...ansData,
      product_id: productId,
    };
    axios
      .post(`/qa/questions/${currentQuestionId}/answers`, ansBody)
      .then(() => {
        fetchQA();
        setCurrentQuestionId(null);
        setShowAnswerForm(false);
      })
      .catch(e => console.error(e));
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
    setNewAnswerData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (url) => {
    setNewAnswerData(prev => ({
      ...prev,
      photos: [...prev.photos, url],
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
            const sortedAnswers = answersArray.sort((a, b) => {
              if (a.answerer_name === "Seller" && b.answerer_name !== "Seller") return -1;
              if (a.answerer_name !== "Seller" && b.answerer_name === "Seller") return 1;
              return b.helpfulness - a.helpfulness;
            });

            const isExpanded = selectedQuestionId === qa.question_id;
            const visibleCount = isExpanded ? sortedAnswers.length : 1;
            return (
              <div className="qa-item" key={index}>
                <QAActions
                  qa={qa}
                  votedQA={votedQA}
                  reportedQA={reportedQA}
                  handleMarkQuestionHelpful={handleMarkQuestionHelpful}
                  handleQuestionReport={handleQuestionReport}
                  setCurrentQuestionId={setCurrentQuestionId}
                  setShowAnswerForm={setShowAnswerForm}
                />

                <div className="answer-group">
                  {sortedAnswers.slice(0, visibleCount).map((answer, idx) => (
                    <AnswerEntry
                      key={idx}
                      answer={answer}
                      handleMarkAnsHelpful={handleMarkAnsHelpful}
                      handleAnsReport={handleAnsReport}
                      reportedQA={reportedQA}
                      votedQA={votedQA}
                    />
                  ))}
                  {sortedAnswers.length > 1 && (
                    <a
                      className="link-more-ans"
                      onClick={() => toggleQuestion(qa.question_id)}
                    >
                      {isExpanded ? "COLLAPSE ANSWERS" : "SHOW MORE ANSWERS"}
                    </a>
                  )}
                </div>

                {currentQuestionId === qa.question_id && (
                  <Modal
                    showModal={showAnswerForm}
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
          MORE ANSWERED QUESTIONS
        </button>
      )}

      <button
        className="add-question"
        onClick={() => setShowAddQuestionForm(true)}
      >
        ADD A QUESTION +
      </button>

      {showQuestionForm && (
        <Modal
          showModal={showQuestionForm}
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
