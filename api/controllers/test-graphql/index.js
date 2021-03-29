'use strict';

exports.graphql = async(obj, args, context, info) =>{
	console.log("args", JSON.stringify(args));
	console.log("path", info.path);
	console.log("fieldName", info.fieldName);

	return "Hello World";
};
