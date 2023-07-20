import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, ExamAnswer, ExamQuestion } from '@/service/mongo';
import { authUser } from '@/service/utils/auth';
import { PagingData } from '@/types';

/* 答题考卷列表 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      keyword,
      categoryId,
      themeId,
      pageNum = 1,
      pageSize = 10
    } = req.body as {
      categoryId: string;
      themeId: string;
      keyword: string;
      pageNum: number;
      pageSize: number;
    };

    await authUser({req, authToken: true});

    await connectToDatabase();

    let where: any = {};
    if (keyword) {
      where = {
        question: {
          $regex: new RegExp(keyword, 'ig')
        }
      };
    }

    if (categoryId) {
      where = {
        ...where,
        categoryId
      };
    }

    if (themeId) {
      where = {
        ...where,
        themeId
      };
    }

    console.log(where, "where");
    const data = await ExamQuestion.find(
      where,
      '_id question answer categoryId themeId  remark createdAt createdBy updatedAt updatedBy'
    )
      .limit(pageSize)
      .skip((pageNum - 1) * pageSize);

    const total = await ExamQuestion.countDocuments(where);
    console.log(data, 'data')
    console.log(total, 'total')
    jsonRes<PagingData<any>>(res, {
      data: {
        pageNum: pageNum,
        pageSize,
        data: data,
        total
      }
    });

  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
