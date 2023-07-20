import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, DictionaryItem, ExamPaper } from '@/service/mongo';
import { authUser } from '@/service/utils/auth';
import { PagingData } from '@/types';
import _ from 'lodash';

/* 答题考卷列表 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      keyword,
      level,
      categoryId,
      themeId,
      pageNum = 1,
      pageSize = 10
    } = req.body as {
      level: string;
      categoryId: string;
      keyword: string;
      pageNum: number;
      themeId: string;
      pageSize: number;
    };

    await authUser({ req, authToken: true });

    await connectToDatabase();

    let where: any = {};

    if (keyword) {
      where = {
        name: {
            $regex: `/${keyword}/i`
        }
      }
    }
    if(level) {
      where = {
        ...where,
        level
      }
    }

    if(categoryId) {
      where = {
        ...where,
        categoryId,
      }
    }

    if(themeId) {
      where = {
        ...where,
        themeId,
      }
    }
    // if (keyword) {
    //   where = {
    //     name: keyword,
    //     level,
    //     categoryId,
    //     test: {
    //       $regex: `/${test}/i`
    //     },
    //     test1: {
    //       $regex: new RegExp(test, 'i')
    //     }
    //   };
    // }
    const data = await ExamPaper.find(where, '_id name level categoryId themeChoices score remark')
      .limit(pageSize)
      .skip((pageNum - 1) * pageSize);

    const total = await ExamPaper.countDocuments(where);

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
