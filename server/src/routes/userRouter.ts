import express, { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import * as db from '../modules/query'
import getValidationUser from '../utils/getValidationUser'
import { createToken, isSignIn } from '../modules/auth'

const router = express.Router()

// 유저 이메일 회원가입
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const token = createToken(email)
    console.log(token)
    if (!getValidationUser('email', email)) {
      res.status(403).json({
        success: false,
        msg: '이메일이 올바르지 않습니다.',
      })
      return
    }
    if (!getValidationUser('password', password)) {
      res.status(403).json({
        success: false,
        msg: '비밀번호가 올바르지 않습니다.',
      })
      return
    }

    const [findByUser] = await db.findUserByEmail({ email })
    if (findByUser) {
      if (findByUser.disabled === 1) {
        res.status(409).json({
          success: false,
          msg: '탈퇴한 회원 입니다.',
        })
        return
      }
      res.status(409).json({
        success: false,
        msg: '이미 가입 된 회원 입니다.',
      })
      return
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const userToken = createToken(email)
    await db.insertUserByEmail({
      email,
      password: hashPassword,
      user_token: userToken,
    })
    const [signUpUser] = await db.findUserByEmail({ email })
    res.status(200).json({
      success: true,
      msg: `${email}님 회원가입 되었습니다.`,
      data: {
        token: signUpUser.user_token,
        user: signUpUser,
      },
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      success: false,
      msg: '오류가 발생 했습니다.',
    })
  }
})

// 유저 이메일 로그인
router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    if (!getValidationUser('email', email)) {
      res.status(401).json({
        success: false,
        msg: '아이디 또는 비밀번호가 일치하지 않습니다.',
      })
      return
    }
    if (!getValidationUser('password', password)) {
      res.status(401).json({
        success: false,
        msg: '아이디 또는 비밀번호가 일치하지 않습니다.',
      })
      return
    }

    const [findByUser] = await db.findUserByEmail({ email })
    if (!findByUser) {
      return res.status(409).json({
        success: false,
        msg: '아이디 또는 비밀번호가 일치하지 않습니다.',
      })
    }
    const isMatchUser = await bcrypt.compare(password, findByUser.password)
    if (!isMatchUser) {
      return res.status(409).json({
        success: false,
        msg: '아이디 또는 비밀번호가 일치하지 않습니다.',
      })
    }

    delete findByUser.password

    const token = createToken(findByUser.email)
    await db.updateUserTokenByEmail({ user_token: token, email })
    res.status(200).json({
      success: true,
      msg: `${findByUser.email}님 로그인 되었습니다.`,
      data: {
        token: findByUser.user_token,
        email: findByUser.email,
      },
    })
  } catch (e) {
    console.error(e)
    res.status(401).json({
      success: false,
      msg: '오류가 발생 했습니다.',
    })
  }
})

router.post('/auth', isSignIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params
    const [findByUser] = await db.findUserByEmail({ email })
    delete findByUser.password
    res.status(200).json({
      success: true,
      data: {
        user: findByUser,
      },
    })
  } catch (e) {
    res.status(500).json({
      success: false,
      msg: '오류가 발생 했습니다.',
    })
  }
})

export default router
