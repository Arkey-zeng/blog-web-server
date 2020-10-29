const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}'`
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // 返回 promise
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBLog = (blogData = {}) => {
  const { title, content, author } = blogData
  const createTime = Date.now()
  
  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', '${createTime}', '${author}')
  `

  return exec(sql).then(inserData => {
    return {
      id: inserData.insertId
    }
  })
}

const updateBLog = (id, blogData = {}) => {
  // blogData 是一个博客对象，包含 title content 属性
  const { title, content } = blogData

  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id}
  `

  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

const delBLog = (id, author) => {
  // id 博客 id
  const sql = `delete from blogs where id=${id} and author='${author}'`

  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBLog,
  updateBLog,
  delBLog
}