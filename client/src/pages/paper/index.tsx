import { Card, Flex, Button, CardHeader, Heading } from '@chakra-ui/react';
import HistoryTable from './components/HistoryTable';

const Paper = () => {
  return (
    <Card m={4} px={[3, 6]} py={4}>
      <Flex justifyContent={'flex-end'} mb={'4'}>
        <Button>开始考试</Button>
      </Flex>
      <CardHeader>
        <Heading size="md">考卷历史</Heading>
      </CardHeader>
      <HistoryTable></HistoryTable>
    </Card>
  );
};

export default Paper;
