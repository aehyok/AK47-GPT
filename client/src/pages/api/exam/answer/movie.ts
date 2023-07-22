// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { Configuration, OpenAIApi } from 'openai';

// const write_moivesinfo_to_database = (movieTitle: string, releaseDate: string, director: string ) => {
//   console.log('WriteWriteWriteWriteWriteWriteWriteWriteWriteWriteWrite', movieTitle, releaseDate, director );
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAIKEY,
    basePath: process.env.OPENAI_BASE_URL
  });

  const { content } = req.body as {
    content: string
  }
  let systemPrompt =`请帮我查找一部2018年到2020年之间 美国比较优秀的电影信息，包括电影名称、上市时间、导演，并使用中文来回复信息`
  console.log(content , 'content-please tell me what you want to do with this message ')
  if(content) {
    systemPrompt = content
  }
  const chatApi = new OpenAIApi(configuration);

  const chatCompletion = await chatApi.createChatCompletion({
    model: 'gpt-3.5-turbo-16k',
    temperature: 0,
    messages: [{ role: 'user', content: `${systemPrompt}` }],
    functions: [
      {
        name: "write_moivesinfo_to_database",
        description: "Write movies into the database.",
        parameters: {
            type: "object",
            properties: {
              movieTitle: {
                type: "string",
                description: "Movie Title",
              },
              releaseDate: {
                type: "string",
                description: "Release Date",
              },
              director: {
                type: "string",
                description: "Director",
              }
            },
            required: ["movieTitle", "releaseDate", "director"],
          }
      }
    ],
  });
  console.log(chatCompletion.data.choices[0], 'chatCompletion')
  jsonRes(res, {
    code : 200,
    data: chatCompletion.data.choices[0]
  });
}