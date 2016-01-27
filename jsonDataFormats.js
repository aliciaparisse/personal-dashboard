//The goal of this file is to specify how the 
//JSON objects manipulated by personal-dashboard should be formatted

//This file is meant to evolve but to stay the reference for all the JSON objects use.


//Format of a course
course = {
	name : "Name as a string",
	//Can be supressed, but can be useful depending on the API providing infos.
	id : 42,
	//lessons is an object array containing objects of type lesson (see below)
	lessons : [
		lesson1,
		lesson2,
		...
	],
	//This might not be useful if there's a logic coded in the API
	//Useful for the tests
	donePercentage:21,
	//This might not be useful if there's a logic coded in the API
	//Useful for the tests
	exercisesDone:24
}

//Format of a lesson
lesson ={
	name:"Name as a string",
	//Can be supressed, but can be useful depending on the API providing infos.
	id : 42,
	//exercises is an object array containing objects of type exercise (see below)
	exercises : [
		exercise1,
		exercise2,
		exercise3
		...
	], 
	//This might not be useful if there's a logic coded in the API
	//Useful for the tests
	donePercentage:21,
	//This might not be useful if there's a logic coded in the API
	//Useful for the tests
	exercisesDone:24
}

//Format of a exercise 
exercise ={
	name:"Name as a string",
	//Can be supressed, but can be useful depending on the API providing infos.
	id : 42,
	//Points given by the resolution of an exercise (maybe not always 1 ?)
	points : 4,
	//Boolean stating if the student did the exercise or not.
	done : true,
}