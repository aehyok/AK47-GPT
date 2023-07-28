// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { connectToDatabase, ExamPaper, ExamQuestion, ExamAnswer } from '@/service/mongo';
import { authUser } from '@/service/utils/auth';
import _ from 'lodash';
import { Configuration, OpenAIApi } from 'openai';
import mongoose from 'mongoose';

// 通过GPT进行数据的转换
async function gptTranslate(
  answerContent: string,
  question: any
) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAIKEY,
    basePath: process.env.OPENAI_BASE_URL
  });

  const chatApi = new OpenAIApi(configuration);

  const maxScore = 10  // 最高分 和最低分
  const systemPrompt =`现在你作为一个前端面试官，我会询问一个问题，并提供该问题的标准答案以及面试者的回答，请将面试者的回答与我提供的标准答案进行比对要求严格一点，先直接给出一个预估的分数（最高10分，最低1分），并将我的回答跟标准答案比对后的差异告诉我，直接回复差异多余的不要输出。`

  const prompt = `${systemPrompt} \n\n
                   我的提问是：${question.question}\n\n
                  标准答案是：${question.answer}\n\n
                  面试者的回答：${answerContent}`;
  const chatCompletion = await chatApi.createChatCompletion({
    model: 'gpt-3.5-turbo-16k',
    temperature: 0.6,
    messages: [{ role: 'user', content: `${prompt}` }],
    functions: [
      {
        name: "write_evaluation_Info_db",
        description: "Write the evaluation scores and evaluation differences into the database.",
        parameters: {
          type: "object",
          properties: {
            score: {
              type: "number",
              description: "evaluation score For example, 5",
            },
            diffInfo: {
              type: "string",
              description: "evaluation differences information",
            },
          },
          required: ["score", "diffInfo"],
        },
      }
    ],
  });
  console.log(chatCompletion.data, '-000000000000000000-------------chatCompletion')
  console.log(chatCompletion.data.choices[0].message, 'chatCompletion')
  return chatCompletion.data.choices[0].message?.function_call?.arguments;
}

const write_evaluation_Info_db = (score: number, diffInfo: string) => {
  console.log('WriteWriteWriteWriteWriteWriteWriteWriteWriteWriteWrite', score, diffInfo);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const {
      paperId,
      questionId,
      answerContent,
      questionNumber
    } = req.body as {
      paperId: string;
      questionId: string;
      answerContent: string;
      questionNumber: number;
    };

    // 凭证校验
    const { userId } = await authUser({ req, authToken: true });

    await connectToDatabase();
    const questionResult = await ExamQuestion.findOne(
      {
        _id: questionId
      })
    console.log(questionResult, 'questionResult------------------------')
    const gptAnswer: any = await gptTranslate(answerContent, questionResult);
    let obj = JSON.parse(gptAnswer)
    console.log(gptAnswer,obj.score, obj.diffInfo, 'gptAnswer------------------------');
    await ExamAnswer.updateOne(
      {
        paperId,
        questionId
      },
      {
        answerContent,
        score: obj.score,
        gptContent: obj.diffInfo,
        updatedBy: userId,
        updatedAt: new Date()
      }
    );
    // 回答到最后一個題目的汇总所有的分数，写入试卷
    if(questionNumber == 10) {

      const totalResponse = await ExamAnswer.aggregate([
        {
          $match: {
            paperId: new mongoose.Types.ObjectId(paperId),
          }
        },
        {
           $group: {
              _id: "$paperId", // 按 studentId 字段进行分组
              totalScore: {$sum: "$score"} // 对每个学生的 score 字段进行求和
           }
        }
     ])

     console.log(totalResponse[0], 'totalResponse')

      await ExamPaper.updateOne(
        {
          _id: paperId
        },
        {
          score: totalResponse[0]?.totalScore
        });
    }
    jsonRes(res, {
      code : 200,
      data: ""
    });

  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}