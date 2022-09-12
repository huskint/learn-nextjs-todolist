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

export const updateTodo = async ({ id, done }: { id: number; done: number }) => {
  try {
    const SQL = 'update todo set done = ? where id = ?'
    const SQL_VALUES = [done, id]
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))()
    return row
  } catch (e: any) {
    console.error(e)
    throw new Error(e)
  }
}

export const deleteTodo = async ({ id }: { id: number }) => {
  try {
    const SQL = 'delete from todo where id = ?'
    const SQL_VALUES = [id]
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
