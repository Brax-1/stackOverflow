import React from "react";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "../../components/Avatar/Avatar";
import { addComment, deleteAnswer } from "../../actions/question";

const DisplayAnswer = ({ question, handleShare }) => {
	const User = useSelector((state) => state.currentUserReducer);
	const { id } = useParams();
	const Navigate = useNavigate();
	const dispatch = useDispatch();
	const handleDelete = (answerId, noOfAnswers) => {
		dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
	};

	const handleComment = (event,comment, answerId) => {
		if (User === null) {
			alert("Login or Signup to answer a question");
			Navigate("/Auth");
		} else {
			if (comment === "") {
				alert("Enter an comment before submitting");
			} else {
				dispatch(
					addComment({ id, answerId, comment, userAnswered: User.result.name })
				);
                event.target.value="";
			}
		}
	};

	return (
		<div>
			{question.answer.map((ans) => (
				<div className="display-ans" key={ans._id}>
					<p>{ans.answerBody}</p>
					<div className="question-actions-user">
						<div>
							<button type="button" onClick={handleShare}>
								Share
							</button>
							{User?.result?._id === ans?.userId && (
								<button
									type="button"
									onClick={() => handleDelete(ans._id, question.noOfAnswers)}
								>
									Delete
								</button>
							)}
						</div>
						<div>
							<p>answered {moment(ans.answeredOn).fromNow()}</p>
							<Link
								to={`/Users/${ans.userId}`}
								className="user-link"
								style={{ color: "#0086d8" }}
							>
								<Avatar
									backgroundColor="lightgreen"
									px="8px"
									py="5px"
									borderRadius="4px"
								>
									{ans.userAnswered.charAt(0).toUpperCase()}
								</Avatar>
								<div>{ans.userAnswered}</div>
							</Link>
						</div>
					</div>
					<div className="question-comment">
						{ans.comment.map((val) => (
							<>
								<div className="question-comment-box">
									<Link
										to={`/Users/${val.userId}`}
										className="user-link"
										style={{ color: "#0086d8" }}
									>
										<Avatar
											backgroundColor="#fffd6c"
											px="6px"
											py="4px"
											fontSize="12px"
											borderRadius="4px"
										>
											{ans.userAnswered.charAt(0).toUpperCase()}
										</Avatar>
									</Link>
									<div className="question-comment-val">
										<div>{val.answerComment}</div>
										<div className="question-comment-time">
											answered {moment(val.answeredOn).fromNow()}
										</div>
									</div>
								</div>
								<div className="divider"></div>
							</>
						))}
						<input
							type={"text"}
							onKeyDown={(e) => {
								e.key === "Enter" && handleComment(e,e.target.value, ans._id);
							}}
							className="question-comment-input"
							placeholder="Add a comment"
							id="comment-box"
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default DisplayAnswer;
