const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Post = require('../models/post_model');
const User = require('../models/user_model');

const clearImage = filePath => {
	filePath = path.join(__dirname, '..', filePath);
	fs.unlink(filePath, err => console.log(err));
};

exports.getPosts = async (req, res, next) => {
	const currentPage = req.query.page || 1;
	const perPage = 2;
	try {
		const totalItems = await Post.find().countDocuments();
		const posts = await Post.find()
			.skip((currentPage - 1) * perPage)
			.limit(perPage);
		res.status(200).json({
			message: 'Posts fetched successfully',
			posts: posts,
			totalItems: totalItems,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.createPost = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect');
		error.statusCode = 422;
		throw error;
	}
	if (!req.file) {
		const error = new Error('No image provided');
		error.statusCode = 422;
		throw error;
	}
	const imageUrl = req.file.path.replace('\\', '/'); //this needs to happen on windows
	const title = req.body.title;
	const content = req.body.content;

	const post = new Post({
		title: title,
		content: content,
		imageUrl: imageUrl,
		creator: req.userId,
	});

	try {
		let savedPost = await post.save();
		let user = await User.findById(req.userId);
		if (!user) {
			const error = new Error('User not found.');
			error.statusCode = 422;
			throw error;
		}
		user.posts.push(savedPost);
		let savedUser = await user.save();
		res.status(201).json({
			message: 'Post created successfully!',
			post: savedPost,
			creator: {
				_id: savedUser._id,
				name: savedUser.name,
			},
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.getPost = async (req, res, next) => {
	const postId = req.params.postId;
	try {
		let post = await Post.findById(postId);
		if (!post) {
			const error = new Error('Post not found!');
			error.statusCode = 404;
			throw error;
		}
		res.status(200).json({
			message: 'Post fetched :)',
			post: post,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.updatePost = async (req, res, next) => {
	const postId = req.params.postId;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect');
		error.statusCode = 422;
		throw error;
	}

	const title = req.body.title;
	const content = req.body.content;
	let imageUrl = req.body.image;
	if (req.file) {
		imageUrl = req.file.path.replace('\\', '/');
	}
	if (!imageUrl) {
		const error = new Error('No file picked');
		error.statusCode = 422;
		throw error;
	}
	//async
	try {
		let post = await Post.findById(postId);
		if (!post) {
			const error = new Error('Post not found!');
			error.statusCode = 404;
			throw error;
		}
		if (post.creator.toString() !== req.userId) {
			const error = new Error('Not authorized');
			error.statusCode = 403;
			throw error;
		}
		if (imageUrl !== post.imageUrl) {
			clearImage(post.imageUrl);
		}

		post.title = title;
		post.imageUrl = imageUrl;
		post.content = content;

		let updatedPost = await post.save();
		res.status(200).json({
			message: 'Updated post :)',
			post: updatedPost,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.deletePost = async (req, res, next) => {
	const postId = req.params.postId;

	try {
		let post = await Post.findById(postId);
		if (!post) {
			const error = new Error('Post not found!');
			error.statusCode = 404;
			throw error;
		}
		if (post.creator.toString() !== req.userId) {
			const error = new Error('Not authorized');
			error.statusCode = 403;
			throw error;
		}
		clearImage(post.imageUrl);

		let deletePostResult = await Post.findByIdAndRemove(postId);
		let user = await User.findById(req.userId);
		user.posts.pull(postId); // remove the post from the post array inside the users object
		let savedUser = await user.save();

		res.status(200).json({
			message: 'Post was DELETED',
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.getStatus = async (req, res, next) => {
	try {
		let user = await User.findById(req.userId);
		if (!user) {
			const err = new Error('No user found');
			err.statusCode = 404;
			throw err;
		}
		res.status(200).json({
			status: user.status,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.updateStatus = async (req, res, next) => {
	console.log(req.body);
	const updatedStatus = req.body.status;

	if (!updatedStatus) {
		const err = new Error('Status cannot be blank');
		err.statusCode = 500;
		throw err;
	}
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, entered data is incorrect');
		error.statusCode = 422;
		throw error;
	}
	try {
		let user = await User.findById(req.userId);
		if (!user) {
			const err = new Error('No user found');
			err.statusCode = 404;
			throw err;
		}
		user.status = updatedStatus;
		let updatedUser = await user.save();
		res.status(201).json({
			message: 'Status updated!',
			status: updatedUser.status,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
