import * as db from '../config/mysql_connect'

export const test0 = async ({ email }: { email: string }) => {
  try {
    const SQL =
      'select id, email, password, type, name, role, user_token, disabled from user where type = 0 and email = ?'
    const SQL_VALUES = [email]
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
