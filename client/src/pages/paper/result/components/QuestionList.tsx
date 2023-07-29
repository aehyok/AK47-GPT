import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import type { PaperQuestionListResponse } from '@/api/response/paper';

const QuestionList = ({
  questions,
  currentIndex,
  onChange
}: {
  questions: PaperQuestionListResponse[];
  currentIndex: number;
  onChange: (index: number) => void;
}) => {
  const handleClick = (index: number) => {
    onChange(index);
  };

  return (
    <>
      {questions.map((item, index) => (
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
            {...(currentIndex === index
              ? {
                  backgroundColor: '#eff0f1',
                  borderLeftColor: 'myBlue.600'
                }
              : {})}
            onClick={() => handleClick(index)}
          >
            {/* <Avatar src={item.avatar} w={'34px'} h={'34px'} /> */}
            <Box flex={'1 0 0'} w={0} ml={3}>
              <Box color={'myGray.1000'}>
                {index + 1}、{item.question}
              </Box>
            </Box>
          </Flex>
        </Box>
      ))}
    </>
  );
};

export default QuestionList;
