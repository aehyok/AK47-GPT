import { useRouter } from 'next/router';
import { getAnswersApi } from '@/api/paper';
import { useEffect, useState } from 'react';
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import QuestionList from './components/QuestionList';
import type { PaperQuestionListResponse, PaperPaperInfoResponse } from '@/api/response/paper';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Result = () => {
  const router = useRouter();
  const { name, id } = router.query;
  const [questions, setQuestions] = useState<PaperQuestionListResponse[]>([]);
  const [paperInfo, setPaperInfo] = useState<PaperPaperInfoResponse>();
  const [currentQuestionIndex, setCurrentQuestionId] = useState(0);

  const Markdown = dynamic(async () => await import('@/components/Markdown'));
  const getAnswers = async () => {
    if (typeof id !== 'string') return;
    const res = await getAnswersApi({ paperId: id });
    setQuestions(res.data.answerList);
    setPaperInfo(res.data.paperInfo[0]);
  };

  useEffect(() => {
    if (id) {
      getAnswers();
    }
  }, [id]);

  return (
    <Flex h={'100%'}>
      <Flex direction={'column'} flex={'1'}>
        <Flex justifyContent={'space-between'} p={'18px 28px 0 28px'} border={'1px solid #D7DBE2'}>
          <Box pb={'18px'} w={'fit-content'} fontWeight={'bold'} borderBottom={'3px solid #2f6af7'}>
            {name}
          </Box>
          <Box color={'#2f6af7'} fontSize={'20px'} fontWeight={'bold'}>
            总得分：{paperInfo?.score}
          </Box>
        </Flex>
        <Flex flex={'1'}>
          {questions.length > 1 && (
            <Box w={'20%'} h={'100%'} bg={'white'} borderRight={'1px solid #D7DBE2'}>
              <QuestionList
                questions={questions}
                currentIndex={currentQuestionIndex}
                onChange={setCurrentQuestionId}
              />
            </Box>
          )}
          <Box flex={'1'} bg={'white'} p={'18px 28px 0 28px'}>
            <Card>
              <CardHeader>
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                  <Heading size="md">题目</Heading>
                  <Box color={'#2f6af7'} fontSize={'20px'} fontWeight={'bold'}>
                    本题得分：{questions[currentQuestionIndex]?.score}
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: questions[currentQuestionIndex]?.question || ''
                  }}
                ></Box>
              </CardBody>
            </Card>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} my={'20px'}>
              <Card flex={'1'}>
                <CardHeader>
                  <Heading size="md">您的回答</Heading>
                </CardHeader>
                <CardBody>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: questions[currentQuestionIndex]?.answerContent || ''
                    }}
                  ></Box>
                </CardBody>
              </Card>
              <Card flex={'1'}>
                <CardHeader>
                  <Heading size="md">智能对比建议</Heading>
                </CardHeader>
                <CardBody>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: questions[currentQuestionIndex]?.gptContent || ''
                    }}
                  ></Box>
                </CardBody>
              </Card>
            </Grid>
            <Card>
              <CardHeader>
                <Heading size="md">标准答案</Heading>
              </CardHeader>
              <CardBody>
                <Markdown source={questions[currentQuestionIndex]?.answer || ''} />
              </CardBody>
            </Card>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Result;
