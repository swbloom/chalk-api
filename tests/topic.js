'use strict';

let topic = require('../api/topic.js');
let mongoose = require('mongoose');
let expect = require('expect.js');
let models = require('../api/models/index.js');
let exercise = require('../api/exercise.js');

describe('Topics', () => {
	let topicId;
	let newTopic;
	let exerciseId;
	before((done) => {
		mongoose.connect('mongodb://localhost/notes');
		exercise.createExercise({
			body: {
				title: 'Test exercise'
			}
		}, {
			send(data) {
				exerciseId = data._id;
				done();
			}
		});
	});
	after(() => {
		mongoose.disconnect();
	});

	it('should create a new topic, and return an object', (done) => {
		topic.createTopic({ body: {title:'test'} }, {
			send(data) {
				topicId = data.topic._id;
				expect(data).to.be.an('object');
				expect(data).to.have.key('topic');
				done();
			}
		});
	});

	it('should return topics', (done) => {
		topic.getTopics({},{
			send(data) {
				expect(data.topic.length).to.be.above(0);
				done();
			}
		});
	});

	it('should a specific topic', (done) => {
		topic.getTopic({
			params: {
				topicId: topicId
			}
		}, {
			send(data) {
				newTopic = data.topic;
				expect(data).to.be.an('object');
				expect(data).to.have.key('topic');
				done();
			}
		});
	});

	it('should update a topic', (done) => {
		newTopic.title = "New Topic update";
		topic.updateTopic({
			params: {
				topicId: topicId
			},
			body: newTopic
		}, {
			send(data) {
				expect(data).to.be.an('object');
				expect(data.topic.title).to.be.eql('New Topic update');
				done();
			}
		})
	});

	it('should add an exercise', (done) => {
		topic.addExercise({
			params: {
				topicId: topicId,
				exerciseId: exerciseId
			}
		}, {
			send(data) {
				expect(data).to.be.an('object');
				expect(data.topic.exercises).to.have.length(1);
				done();
			}
		});
	});

	it('should remove an exercise', (done) => {
		topic.removeExercise({
			params: {
				topicId: topicId,
				exerciseId: exerciseId
			}
		}, {
			send(data) {
				expect(data).to.be.an('object');
				expect(data.topic.exercises).to.have.length(0);
				done();
			}
		});
	});

	it('should remove a topic', (done) => {
		topic.removeTopic({
			params: {
				topicId: topicId
			}
		}, {
			send(data) {
				expect(data).to.be.an('object');
				expect(data.topic).to.have.length(0);
				done();
			}
		});
	});
});





