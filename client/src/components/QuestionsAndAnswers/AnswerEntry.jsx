import React from "react";
import { format } from "date-fns";

const AnswerEntry = ({
  answer,
  handleMarkAnsHelpful,
  handleAnsReport,
  reportedQA,
  votedQA,
}) => {
  let newDate = new Date(answer.date);
  newDate.setTime(newDate.getTime() + (4*60*60*1000));
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
            by {" "}
            {answer.answerer_name === "Seller" ? (
              <b>Seller</b>
            ) : (
              answer.answerer_name
            )}
            , {format(new Date(newDate), "MM/dd/yyyy")} |
          </span>
          <div className="answer-actions">
            <span className="help-text">
              Helpful?
              {votedQA.answers.includes(answer.id) ? (
                <span>Yes ({answer.helpfulness}) | </span>
              ) : (
                <a
                  className="link"
                  onClick={() => handleMarkAnsHelpful(answer.id)}
                >
                  Yes ({answer.helpfulness}) |
                </a>
              )}
            </span>
            {reportedQA.answers.includes(answer.id) ? (
              <span>Reported</span>
            ) : (
              <a className="link" onClick={() => handleAnsReport(answer.id)}>
                Report
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerEntry;
