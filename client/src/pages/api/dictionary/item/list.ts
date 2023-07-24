import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, DictionaryItem, DictionaryGroup } from '@/service/mongo';
import { authUser } from '@/service/utils/auth';
import { PagingData } from '@/types';

/* 获取字典分组列表 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      groupCode,
      keyword,
      pageNum = 1,
      pageSize = 10
    } = req.body as {
      groupCode: string;
      keyword: string;
      pageNum: number;
      pageSize: number;
    };
    // await authUser({req, authToken: true});

    await connectToDatabase();

    let where: any = { isDeleted: false };
    if (keyword) {
      where = {
        ...where,
        name: keyword
      };
    } else {
      where = {
        ...where
      };
    }

    if (groupCode) {
      where = {
        ...where,
        groupCode
      };
    }
    const data = await DictionaryItem.find(
      where,
      '_id name code groupCode parentId isEnable order remark'
    )
      .limit(pageSize)
      .skip((pageNum - 1) * pageSize);

    const total = await DictionaryItem.countDocuments(where);
    // const [models, total] = await Promise.all([
    //   DictionaryItem.find(where, '_id name code order remark')
    //     .sort({
    //       _id: -1
    //     })
    //     .limit(pageSize)
    //     .skip((pageNumber - 1) * pageSize),
    //   DictionaryGroup.countDocuments(where)
    // ]);

    jsonRes<any>(res, {
      pageNum: pageNum,
      pageSize,
      data: data,
      total
    });
  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
