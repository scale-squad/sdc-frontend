import React from "react";
import { format } from "date-fns";

const AnswerEntry = ({
  answer,
  handleMarkAnsHelpful,
  handleAnsReport,
  reportedQA,
  votedQA,
}) => {
  return (
    <div className="answer">
      <span>
        <strong>A:</strong> {answer.body}
      </span>
      <div className="answer-item">
        {answer.photos && answer.photos.length > 0 && (
          <div className="answer-photos">
            {answer.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt="thumbnail"
                className="thumbnail"
              />
            ))}
          </div>
        )}
        <div className="answer-info">
          <span>
            by
            {answer.answerer_name === "Seller" ? (
              <b>Seller</b>
            ) : (
              answer.answerer_name
            )}
            , {format(new Date(answer.date), "MM/dd/yyyy")} |
          </span>
          <div className="answer-actions">
            <span className="help-text">
              Helpful?
              {votedQA.answers.includes(answer.id) ? (
                <span>Yes ({answer.helpfulness})</span>
              ) : (
                <span
                  className="link"
                  onClick={() => handleMarkAnsHelpful(answer.id)}
                >
                  Yes ({answer.helpfulness}) |
                </span>
              )}
            </span>
            {reportedQA.answers.includes(answer.id) ? (
              <span>Reported</span>
            ) : (
              <span className="link" onClick={() => handleAnsReport(answer.id)}>
                Report
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerEntry;
