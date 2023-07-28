import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Avatar from '@/components/Avatar';
import type { PaperQuestionListResponse } from '@/api/response/paper';

const QuestionList = ({
  questions,
  questionId
}: {
  questions: PaperQuestionListResponse[];
  questionId: string;
}) => {
  const router = useRouter();

  return (
    <>
      {questions.map((item) => (
        <Box key={item._id}>
          <Flex
            key={item._id}
            position={'relative'}
            alignItems={['flex-start', 'center']}
            p={3}
            cursor={'pointer'}
            transition={'background-color .2s ease-in'}
            borderLeft={['', '5px solid transparent']}
            zIndex={0}
            _hover={{
              backgroundColor: ['', '#dee0e3']
            }}
            {...(questionId === item._id
              ? {
                  backgroundColor: '#eff0f1',
                  borderLeftColor: 'myBlue.600'
                }
              : {})}
            onClick={() => {
              router.replace(`/chat?modelId=${item._id}`);
            }}
          >
            {/* <Avatar src={item.avatar} w={'34px'} h={'34px'} /> */}
            <Box flex={'1 0 0'} w={0} ml={3}>
              <Box className="textEllipsis" color={'myGray.1000'}>
                {item.question}
              </Box>
            </Box>
          </Flex>
        </Box>
      ))}
    </>
  );
};

export default QuestionList;
