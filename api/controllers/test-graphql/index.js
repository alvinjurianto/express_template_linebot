'use strict';

exports.graphql = async(parent, args, context, info) =>{
	console.log("args", JSON.stringify(args));
	console.log("path", info.path);

	return "Hello World";
};
