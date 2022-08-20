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

export const test1 = async ({ user_token, email }: { user_token: string; email: string }) => {
  try {
    const SQL = 'update user set user_token = ? where email = ?'
    const SQL_VALUES = [user_token, email]
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))()
    return row
  } catch (e: any) {
    console.error(e)
    throw new Error(e)
  }
}
