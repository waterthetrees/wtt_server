/* eslint-disable camelcase */
const { db } = require('../../db');
const { IDForTree } = require('./id');

async function findAllTreeIds() {
 const query = `SELECT id_tree AS id_tree, common, scientific, city, lat, lng FROM treedata`;
 const treeIds = await db.manyOrNone(query);
 return treeIds;
}

async function updateTreeId(id, id_tree) {
  const query = `update treedata set id = ${id} WHERE id_tree = ${id_tree}`;
  const updatedTree = await db.manyOrNone(query);
  return updatedTree;
}

async function findAndReplaceTreeIds() {
 const treeIdRows = await findAllTreeIds();
 for (let i = 0; i < treeIdRows.length; i++) {
  const id = IDForTree(treeIdRows[i]);
  const {id_tree} = treeIdRows[i];
  console.log(id, id_tree);
  updateTreeId(id, id_tree);
 }
}

async function findDuplicateTreeCounts() {
 const query = `select id, count(1) AS counted from treedata group by id having count(1) > 1;`;
 // select count(id) from treedata group by id having count(id) > 1;
 const result = await db.manyOrNone(query);
 return result;
}

async function updateDuplicates(id){
 const query = `update treedata set 
 location_tree_count = (select count(id) from treedata where id = ${id} and location_tree_count is null group by id having count(id) > 1), 
 notes = (select string_agg(id_reference, ', ' order by id_reference) from treedata where id = ${id}) 
 where id = '${id}';`;
 const result = await db.manyOrNone(query);
 return result;
}

async function deleteDuplicates(){
 const query = `DELETE FROM treedata a USING treedata b WHERE a.id_tree < b.id_tree AND a.id = b.id;`;
 const result = await db.manyOrNone(query);
 return result;
}

async function findAndRemoveDuplicateTrees() {
 const treeIdRows = await findDuplicateTreeCounts();
 for await (const row of treeIdRows) {
  console.log(`row',${row.id}`)
  await updateDuplicates(row.id)
 }
 // await deleteDuplicates()
}
findAndRemoveDuplicateTrees()
// findAndReplaceTreeIds()