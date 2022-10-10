import express, { Request, Response, NextFunction } from 'express'

import * as db from '../modules/query'
import { isSignIn } from '../modules/auth'

const router = express.Router()

// 투두리스트 생성
router.post('/', isSignIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params
    const { text } = req.body
    await db.insertV2Todo({ email, text })
    res.status(200).json({
      success: true,
      msg: '생성 되었습니다.',
    })
  } catch (e) {
    console.error(e)
    res.status(401).json({
      success: false,
      msg: '오류가 발생 했습니다.',
    })
  }
})

// 투두리스트 정보 변경
router.patch('/:id', isSignIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, email } = req.params
    const { done } = req.body
    await db.updateV2Todo({
      id: Number(id),
      done: done ? 1 : 0,
      email,
    })
    res.status(200).json({
      success: true,
      msg: `${id}번 ${done === 1 ? '완료' : '미완료'} 되었습니다.`,
    })
  } catch (e) {
    console.error(e)
    res.status(401).json({
      success: false,
      msg: '오류가 발생 했습니다.',
    })
  }
})

// 투두리스트 삭제
router.delete('/:id', isSignIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, email } = req.params
    await db.deleteV2Todo({
      id: Number(id),
      email,
    })
    res.status(200).json({
      success: true,
      msg: `${id}번 삭제 되었습니다.`,
    })
  } catch (e) {
    console.error(e)
    res.status(401).json({
      success: false,
      msg: '오류가 발생 했습니다.',
    })
  }
})

// 투두리스트 전체 목록 조회
router.get('/', isSignIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params
    const list = await db.getV2TodoList({ email })
    res.status(200).json({
      success: true,
      data: list.map((el: { done: number }) => ({
        ...el,
        done: el.done === 1 ? true : false,
      })),
    })
  } catch (e) {
    console.error(e)
    res.status(401).json({
      success: false,
      msg: '오류가 발생 했습니다.',
    })
  }
})

export default router
