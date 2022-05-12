import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer = async (req, res) => {
	const { id: _id } = req.params;
	const { noOfAnswers, answerBody, userAnswered } = req.body;
	const userId = req.userId;
	if (!mongoose.Types.ObjectId.isValid(_id)) {
		return res.status(404).send("question unavailable...");
	}

	updateNoOfQuestions(_id, noOfAnswers);
	try {
		const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
			$addToSet: { answer: [{ answerBody, userAnswered, userId }] },
		});
		res.status(200).json(updatedQuestion);
	} catch (error) {
		res.status(400).json("error in updating");
	}
};
const handleAnswerId = (data, answerId, comment, userAnswered,userId) => {
	const objectId = data._id;
	if (objectId.toString()===answerId) {
		const oldComments = data.comment;
		data.comment = [
			{ answerComment: comment,
				userCommented: userAnswered,
				userId: userId, },...oldComments
		];
	}
	return data;
};


export const AddComment = async (req, res) => {
	const { id: _id } = req.params;
	const { answerId, comment, userAnswered } = req.body;
	const userId = req.userId;
	if (!mongoose.Types.ObjectId.isValid(_id)) {
		return res.status(404).send("question unavailable...");
	}
	try {
		const getData = await Questions.findById(_id);
		const updatedAnwer = getData.answer.map((data) =>
			handleAnswerId(data, answerId, comment, userAnswered,userId)
		);
		const commentUpdate = await Questions.findByIdAndUpdate(_id, {
			$set: { answer: updatedAnwer },
		});
		res.status(200).json(commentUpdate);
	} catch (error) {
		res.status(400).json("error in commenting");
	}
};

const updateNoOfQuestions = async (_id, noOfAnswers) => {
	try {
		await Questions.findByIdAndUpdate(_id, {
			$set: { noOfAnswers: noOfAnswers },
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteAnswer = async (req, res) => {
	const { id: _id } = req.params;
	const { answerId, noOfAnswers } = req.body;
	console.log("done");

	if (!mongoose.Types.ObjectId.isValid(_id)) {
		return res.status(404).send("Question unavailable...");
	}
	if (!mongoose.Types.ObjectId.isValid(answerId)) {
		return res.status(404).send("Answer unavailable...");
	}
	updateNoOfQuestions(_id, noOfAnswers);
	try {
		await Questions.updateOne(
			{ _id },
			{ $pull: { answer: { _id: answerId } } }
		);
		res.status(200).json({ message: "Successfully deleted..." });
	} catch (error) {
		res.status(405).json(error);
	}
};
