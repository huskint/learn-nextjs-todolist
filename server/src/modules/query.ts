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

export const insertV2Todo = async ({ email, text }: { email: string; text: string }) => {
  try {
    const SQL = 'insert into todo2(email, text) values(?, ?)'
    const SQL_VALUES = [email, text]
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))()
    return row
  } catch (e: any) {
    console.error(e)
    throw new Error(e)
  }
}

export const updateV2Todo = async ({ id, done, email }: { id: number; done: number; email: string }) => {
  try {
    const SQL = 'update todo2 set done = ? where id = ? AND email = ?'
    const SQL_VALUES = [done, id, email]
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))()
    return row
  } catch (e: any) {
    console.error(e)
    throw new Error(e)
  }
}

export const deleteV2Todo = async ({ id, email }: { id: number; email: string }) => {
  try {
    const SQL = 'delete from todo2 where id = ? AND email = ?'
    const SQL_VALUES = [id, email]
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))()
    return row
  } catch (e: any) {
    console.error(e)
    throw new Error(e)
  }
}

export const getV2TodoList = async ({ email }: { email: string }) => {
  try {
    const SQL = 'select * from todo2 where email = ?'
    const SQL_VALUES = [email]
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))()
    return row
  } catch (e: any) {
    console.error(e)
    throw new Error(e)
  }
}

export const findUserByEmail = async ({ email }: { email: string }) => {
  try {
    const SQL = 'select id, email, password, user_token from user where email = ?'
    const SQL_VALUES = [email]
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))()
    return row
  } catch (e: any) {
    console.error(e)
    throw new Error(e)
  }
}

export const insertUserByEmail = async ({
  email,
  password,
  user_token,
}: {
  email: string
  password: string
  user_token: string
}) => {
  try {
    const SQL = 'insert into user(email, password, user_token) values(?, ?, ?)'
    const SQL_VALUES = [email, password, user_token]
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))()
    return row.insertId
  } catch (e: any) {
    console.error(e)
    throw new Error(e)
  }
}

export const updateUserTokenByEmail = async ({ user_token, email }: { user_token: string; email: string }) => {
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
