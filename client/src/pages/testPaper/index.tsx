import { Card, Box, Flex, Button, Input, Grid, useDisclosure } from '@chakra-ui/react';
import Tabs from '@/components/Tabs';

const TestPaper = () => {
  return (
    <Card mt={4} px={[3, 6]} py={4}>
      <Tabs
        m={'auto'}
        w={'200px'}
        list={tableList.current}
        activeId={tableType}
        size={'sm'}
        onChange={(id: any) => router.replace(`/number?type=${id}`)}
      />
      <Box minH={'300px'}>
        {(() => {
          const item = tableList.current.find((item) => item.id === tableType);

          return item ? item.Component : null;
        })()}
      </Box>
    </Card>
  );
};

export default TestPaper;
