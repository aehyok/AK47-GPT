import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, DictionaryItem } from '@/service/mongo';
import { authUser } from '@/service/utils/auth';

/* 禁用字典项和启用字典字典项 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { _id, isEnable } = req.body as { _id: string, isEnable: boolean };

    if (!_id) {
      throw new Error('参数错误');
    }

    // 凭证校验
    await authUser({req, authToken: true});
    
    await connectToDatabase();

    // 删除字典分组
    await DictionaryItem.updateOne(
      {
        _id,
        isEnable: !isEnable
      }, 
      {
        isEnable
      }
    );

    //todo 应该还要检查一下是否存在字典项

    jsonRes(res);
  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
