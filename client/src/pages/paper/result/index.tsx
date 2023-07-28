import { useRouter } from 'next/router';
import { getAnswersApi } from '@/api/paper';
import { useEffect, useState } from 'react';
import { Box, Flex, Text, Textarea, Button, useToast } from '@chakra-ui/react';
import QuestionList from './components/QuestionList';
import type { PaperQuestionListResponse } from '@/api/response/paper';
import styles from './index.module.scss';

const Result = () => {
  const router = useRouter();
  const { name, id } = router.query;
  const [questions, setQuestions] = useState<PaperQuestionListResponse[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState('');

  const getAnswers = async () => {
    if (typeof id !== 'string') return;
    const res = await getAnswersApi({ paperId: id });
    console.log(res);
    setQuestions(res.data.answerList);
    setCurrentQuestionId(res.data.answerList[0]._id);
  };

  useEffect(() => {
    if (id) {
      getAnswers();
    }
  }, [id]);

  return (
    <Box
      className={styles.newChat}
      zIndex={1001}
      w={'90%'}
      h={'40px'}
      my={5}
      mx={'auto'}
      position={'relative'}
    >
      {questions.length > 1 && (
        <Box
          className={styles.modelListContainer}
          position={'absolute'}
          w={'115%'}
          left={0}
          top={'40px'}
          transition={'0.15s ease-out'}
          bg={'white'}
        >
          <Box className={styles.modelList} mt={'6px'} h={'calc(100% - 6px)'} overflow={'overlay'}>
            <QuestionList questions={questions} questionId={currentQuestionId} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Result;
