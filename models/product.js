const init = connection => {
  const create = async data => {
    const conn = await connection
    await conn.query(`insert into products (product,price) values (?,?)`, data)
  }
  const remove = async id => {
    const conn = await connection
    await conn.query(`delete from products where id=? limit 1`, [id])
  }
  const update = async (id, data) => {
    const conn = await connection
    await conn.query(`update products set product =? , price = ? where id =?`, [...data, id])
  }
  const updateCategories = async(product_id,categoriesID) =>{
    const conn = await connection
    await conn.query(`delete from category_product where product_id=?`,[product_id])
    for await(const category of categoriesID){
        await conn.query(`insert into category_product (product_id, category_id) values (?,?)`, [product_id,category])
    }
  }
  const getImages = async results => {
    if(results.length === 0){
      return []
    }
    const conn = await connection
    const idsProducts = results.map(product => product.id).join(',')
    const [images] = await conn.query(
      'select * from images where product_id in (' + idsProducts + ') group by product_id'
    )
    const mapImages = images.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.product_id]: curr,
      }
    }, {})
    const products = results.map(product => {
      return {
        ...product,
        images: mapImages[product.id],
      }
    })
    return products
  }
  const getAll = async () => {
    const conn = await connection
    const [results] = await conn.query(`select * from products`)
    return getImages(results)
  }
  const getById = async(id) =>{
    const conn = await connection
    const [results] = await conn.query(`select * from products where id =${id} `)
    const [images] = await conn.query(`select * from images where product_id = ${id}`)
    if(results.length === 0){
      return null
    }
    return {
      ...results[0],
      images
    }
  }
  const getPaginated = async({pageSize = 1, currentPage = 0}={}) =>{
    const conn = await connection
    const [results] = await conn.query(`select * from products limit ${currentPage*pageSize},${pageSize+1}`)
    const hasNext = results.length > pageSize
    if(results.length > pageSize){
       results.pop()

    }
    const resultsWithImages = await getImages(results)
    return{
        data: resultsWithImages,
        hasNext
    }
  }
  const getByCategory = async(categoryID) =>{
      const conn = await connection
      const [results] = await conn.query(`select * from products where id in (select product_id from category_product where category_id =?)`,[categoryID])
      return getImages(results)
  }
  const addImage = async (product_id, data) => {
    const conn = await connection
    await conn.query(`insert into images (product_id,description,url) values(?,?,?)`, [
      product_id,
      ...data,
    ])
  }
  const removeImage = async (product_id, imageId) => {
    const conn = await connection
    await conn.query(`delete from images where product_id = ? and id = ? `, [
      product_id,
      imageId
    ])
  }
  return {
    create,
    remove,
    update,
    updateCategories ,
    getAll,
    addImage,
    removeImage,
    getByCategory,
    getPaginated,
    getById

  }
}
module.exports = init
