// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, DictionaryGroup } from '@/service/mongo';
import { authUser } from '@/service/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { _id, name, code, order, remark, isSystem } = req.body as {
      _id: string;
      name: string;
      code: string;
      order: number;
      remark: string;
      isSystem: boolean;
    };

    // 凭证校验
    const { userId } = await authUser({ req, authToken: true });

    await connectToDatabase();
    let response: any = null;
    if (_id) {
      // update
      response = await DictionaryGroup.updateOne({
        _id
      },{
        name,
        code,
        order,
        remark,
        isSystem,
        updatedBy: userId,
        updatedAt: new Date(),
      });
      jsonRes(res, {
        data: response._id
      });
    } else
      {
        // create
        response = await DictionaryGroup.create({
          name,
          code,
          order,
          remark,
          isSystem,
          isDelete: false,
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
