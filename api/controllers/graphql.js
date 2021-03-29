'use strict';

const THIS_BASE_PATH = process.env.THIS_BASE_PATH;
const CONTROLLERS_BASE = THIS_BASE_PATH + '/api/controllers/';
const GRAPHQL_TARGET_FNAME = "schema.graphql";

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
      const doc = gql(typeDefs);
      const resolver = require(CONTROLLERS_BASE + folder);

      let resolvers = {};
      doc.definitions.forEach(element1 =>{
        const define_name = element1.name.value;
        resolvers[define_name] = {};

        element1.fields.forEach( element2 =>{
          const field_name = element2.name.value;

          resolvers[define_name][field_name] = resolver.graphql;
        });
      });

      const executableSchema = makeExecutableSchema({
        typeDefs,
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

module.exports = parse_graphql();