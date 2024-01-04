export function parseQueryParams(req) {
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10
  let page = parseInt(req.query.page) ? parseInt(req.query.page) : 1
  let sortVal = req.query.sort 
  let queryVal = req.query.query

  let sort = {}
  let query = {}
  
  if (queryVal && JSON.parse(queryVal) && typeof JSON.parse(queryVal) === 'object') {
    console.log("parsed object", JSON.parse(queryVal))
    query = JSON.parse(queryVal)
  }

  //If sortval is equal to any of these
  if (["asc", "desc", 1, -1].includes(sortVal)) {
    sort = { price: sortVal }
  }

  return {
    limit: limit,
    page: page,
    sort: sort, 
    query: query
  }
}