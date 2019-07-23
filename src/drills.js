const knex = require('knex');
require ('dotenv').config();

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

function getAllItemsThatContainText(searchTerm){
  knexInstance('shopping_list')
    .select('view_id', 'name', 'price', 'date_added', 'checked', 'category')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(res => console.log(1, res))
    .catch(err => console.log(err));
}
//getAllItemsThatContainText('tofurkey');

function getAllItemsPaginated(pageNumber) {
  const productsPerPage = 10;
  const offset = productsPerPage * (pageNumber -1);
  knexInstance('shopping_list')
    .select('view_id', 'name', 'price', 'date_added', 'checked', 'category')
    .limit(productsPerPage)
    .offset(offset)
    .then(res => console.log(2, res))
    .catch(err => console.log(err));
}
//getAllItemsPaginated(2);


function getAllItemsAddedAfterDate(daysAgo){
  knexInstance('shopping_list')
    .select('view_id', 'name', 'price', 'date_added', 'checked', 'category')
    .where('date_added',
      '>',
      // eslint-disable-next-line quotes
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .then(res => console.log(3, res))
    .catch(err => console.log(err));
}
//getAllItemsAddedAfterDate(1);

function getTotalCostForEachCategory(){
  knexInstance('shopping_list')
    .select('category')
    .groupBy('category')
    .sum('price AS total')
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
getTotalCostForEachCategory();
