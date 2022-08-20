import express, { Request, Response, NextFunction } from 'express'

import * as db from '../modules/query'

const router = express.Router()

// 투두리스트 생성
router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (e) {
    console.error(e)
    res.status(401).json({
      success: false,
      msg: '오류가 발생 했습니다.',
    })
  }
})

export default router
