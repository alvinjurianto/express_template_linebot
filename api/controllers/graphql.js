'use strict';

const THIS_BASE_PATH = process.env.THIS_BASE_PATH;
const CONTROLLERS_BASE = THIS_BASE_PATH + '/api/controllers/';
const GRAPHQL_TARGET_FNAME = "schema.graphql";

const DEFAULT_HANDLER = "graphql";

const fs = require('fs');
const { makeExecutableSchema } = require('graphql-tools');
const gql = require('graphql-tag');

function parse_graphql() {
  let schema_list = [];

  // schema.graphqlの検索
  const folders = fs.readdirSync(CONTROLLERS_BASE);
  folders.forEach(folder => {
    if( !fs.existsSync(CONTROLLERS_BASE + folder) )
      return;
    const stats_dir = fs.statSync(CONTROLLERS_BASE + folder);
    if (!stats_dir.isDirectory())
      return;

    try {
      const fname = CONTROLLERS_BASE + folder + "/" + GRAPHQL_TARGET_FNAME;
      if( !fs.existsSync(fname) )
        return;
      const stats_file = fs.statSync(fname);
      if (!stats_file.isFile())
        return;

      // schema.graphqlの解析
      var typeDefs = fs.readFileSync(fname).toString();
      const gqldoc = gql(typeDefs);
      const handler = require(CONTROLLERS_BASE + folder);

      let resolvers = {};
      let num_of_resolve = 0;
      gqldoc.definitions.forEach(element1 =>{
        if( element1.kind != 'ObjectTypeDefinition')
          return;

        const define_name = element1.name.value;
        if( define_name != 'Query' && define_name != 'Mutation' )
          return;
            
        // handler(Object部)の解析
        let object_handler = DEFAULT_HANDLER;
        var h1 = element1.directives.find(item => item.name.value == 'handler');
        if( h1 ){
          var h2 = h1.arguments.find(item => item.name.value == 'handler');
          if( h2 ){
            object_handler = h2.value.value;
          }
        }

        if( !resolvers[define_name] )
          resolvers[define_name] = {};

        element1.fields.forEach( element2 =>{
          if( element2.kind != 'FieldDefinition')
            return;

          // handler(Field部)の解析
          let field_handler = object_handler;
          var h1 = element2.directives.find(item => item.name.value == 'handler');
          if( h1 ){
            var h2 = h1.arguments.find(item => item.name.value == 'handler');
            if( h2 ){
              field_handler = h2.value.value;
            }
          }
  
          const field_name = element2.name.value;
          resolvers[define_name][field_name] = handler[field_handler];
          num_of_resolve++;
        });
      });

      if( num_of_resolve <= 0 )
        return;

      const executableSchema = makeExecutableSchema({
        typeDefs: [handlerDirective, gqldoc],
        resolvers
      });

      schema_list.push({
        schema: executableSchema,
        folder: folder
      });
    } catch (error) {
      console.log(error);
    }
  });

  return schema_list;
}

const handlerDirective = `
  directive @handler(
    handler: String
  ) on OBJECT | FIELD_DEFINITION
`;

module.exports = parse_graphql();
