import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, DictionaryGroup } from '@/service/mongo';
import { authUser } from '@/service/utils/auth';
import { PagingData } from '@/types';

/* 获取字典分组列表 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      keyword,
      pageSize = 10,
      pageNum = 1
    } = req.body as {
      keyword: string;
      pageSize: number;
      pageNum: number;
    };
    // const { userId } = await authUser({ req, authToken: true });

    await connectToDatabase();
    console.log(keyword, "111111")
    let where = {};
    if (keyword) {
      where = {
        name: keyword
      };
    }
    // const data = await DictionaryGroup.find( where, '_id name code order remark')
    //     .sort({ updateAt: -1 })
    //     .limit(20);

    const [models, total] = await Promise.all([
      DictionaryGroup.find(where, '_id name code order remark')
        // .sort({
        //   _id: -1
        // })
        .limit(pageSize)
        .skip((pageNum - 1) * pageSize),
      DictionaryGroup.countDocuments(where)
    ]);

    jsonRes<PagingData<any>>(res, {
      data: {
        pageNum: pageNum,
        pageSize,
        data: models,
        total
      }
    });

    // jsonRes(res, {
    //   data
    // });
  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
