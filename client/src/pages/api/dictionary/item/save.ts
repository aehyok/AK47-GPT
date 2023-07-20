// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, DictionaryItem } from '@/service/mongo';
import { authUser } from '@/service/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { _id, name, code, order, remark, parentId, isEnable,groupCode } = req.body as {
      _id: string;
      name: string;
      code: string;
      order: number;
      remark: string;
      parentId: string;
      isEnable: boolean;
      groupCode: string;
    };

    // 凭证校验
    const { userId } = await authUser({ req, authToken: true });
    console.log(userId, 'userId---------------111111111111111111111')
    await connectToDatabase();
    let response: any = null;
    if (_id) {
      // update
      response = await DictionaryItem.updateOne(
        {
          _id
        },
        {
          name,
          code,
          order,
          remark,
          isEnable,
          parentId,
          groupCode,
          updatedBy: userId,
          updatedAt: new Date()
        }
      );
      jsonRes(res, {
        data: response._id
      });
    } else {
      // create
      response = await DictionaryItem.create({
        name,
        code,
        order,
        remark,
        isEnable,
        parentId,
        groupCode,
        isDeleted: false,
        createdAt: new Date(),
        createdBy: userId
      });
      jsonRes(res, {
        data: response._id
      });
    }
  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
