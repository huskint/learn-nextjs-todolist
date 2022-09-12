import * as db from '../config/mysql_connect'

export const insertTodo = async ({ text }: { text: string }) => {
  try {
    const SQL = 'insert into todo(text) values(?)'
    const SQL_VALUES = [text]
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))()
    return row
  } catch (e: any) {
    console.error(e)
    throw new Error(e)
  }
}

export const updateTodo = async ({ id, success }: { id: number; success: number }) => {
  try {
    const SQL = 'update todo set success = ${success} where id = ${id}'
    const SQL_VALUES = [success, id]
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))()
    return row
  } catch (e: any) {
    console.error(e)
    throw new Error(e)
  }
}

export const getTodoList = async () => {
  try {
    const SQL = 'select * from todo'
    const [row] = await db.connect((con: any) => con.query(SQL))()
    return row
  } catch (e: any) {
    console.error(e)
    throw new Error(e)
  }
}
