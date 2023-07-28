import { Box, Flex, Text, Textarea, Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getQuestionsApi, postAnswerUpdateApi } from '@/api/paper';
import { useState, useEffect, ChangeEvent } from 'react';
import type { PaperQuestionListResponse } from '@/api/response/paper';
import { useLoading } from '@/hooks/useLoading';
import { AxiosError } from 'axios';

const Exam = () => {
  const router = useRouter();
  const { name, id } = router.query;
  const [questions, setQuestions] = useState<PaperQuestionListResponse[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswerContent, setCurrentAnswerContent] = useState('');
  const { Loading, setIsLoading } = useLoading();
  const toast = useToast();

  const getQuestions = async () => {
    if (typeof id !== 'string') return;
    const res = await getQuestionsApi({ paperId: id });
    res.data.some((item, index) => {
      if (!item.isAnswered) {
        setCurrentQuestionIndex(index);
        return true;
      }
    });
    setQuestions(res.data);
  };

  const handleSubmit = async () => {
    if (typeof id !== 'string') return;
    setIsLoading(true);
    try {
      await postAnswerUpdateApi({
        paperId: id,
        questionId: questions[currentQuestionIndex]._id,
        answerContent: currentAnswerContent,
        questionNumber: currentQuestionIndex + 1
      });
      setIsLoading(false);
      if (currentQuestionIndex + 1 >= questions.length)
        return router.push({ pathname: '/paper/result', query: { id, name } });
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswerContent('');
    } catch (error) {
      setIsLoading(false);
      toast({
        title: (error as AxiosError).message,
        status: 'warning'
      });
    }
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentAnswerContent(event.target.value);
  };

  useEffect(() => {
    if (id) {
      getQuestions();
    }
  }, [id]);

  return (
    <Flex h={'100%'}>
      <Flex direction={'column'} flex={'1'}>
        <Box p={'18px 28px 0 28px'} border={'1px solid #D7DBE2'}>
          <Box pb={'18px'} w={'fit-content'} fontWeight={'bold'} borderBottom={'3px solid #2f6af7'}>
            {name}
          </Box>
        </Box>
        <Flex flex={'1'}>
          <Box bg={'#f5f5f5'} width={'400px'}>
            <Flex alignItems={'center'} p={'8px 10px'}>
              <Box w={3} h={3} bg={'#11bb9c'}></Box>
              <Text fontSize={'18px'} fontWeight={'bold'} pl={2}>
                题目
              </Text>
            </Flex>
            <Box bg={'#e3e3e3'} color={'#959595'} p={'8px 10px'}>
              面试官提出的问题将出现在这里
            </Box>
            <Box
              p={'10px 20px'}
              dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex]?.question }}
            ></Box>
          </Box>
          <Flex direction={'column'} flex={1}>
            <Flex borderBottom={'1px solid #D7DBE2'}>
              {questions.map((question, index) => (
                <Flex
                  key={index}
                  p={'8px 12px'}
                  fontSize={'16px'}
                  fontWeight={'500'}
                  bg={index <= currentQuestionIndex ? '#11bb9c' : 'transparent'}
                  color={index <= currentQuestionIndex ? '#fff' : '#000'}
                >
                  题{index + 1}
                </Flex>
              ))}
            </Flex>
            <Textarea
              flex={1}
              placeholder="请输入您的回答"
              value={currentAnswerContent}
              onChange={handleTextareaChange}
            ></Textarea>
            <Flex p={'8px 14px'} justifyContent={'flex-end'}>
              <Button onClick={handleSubmit}>
                {currentQuestionIndex + 1 >= questions.length ? '提交' : '下一步'}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Loading fixed={false} />
    </Flex>
  );
};

export default Exam;
