import { Card, Flex, Typography } from 'antd';

function CurrencyCard({ currency }){
  return(
    <Card title={`${currency.charCode} (${currency.nominal})`}>
      <Flex vertical gap='small'>
        <Typography.Text strong>{currency.name}</Typography.Text>
        <Typography.Text>Курс: {currency.value} руб.</Typography.Text>
        <Typography.Text>Предыдущий курс: {currency.previous} руб.</Typography.Text>
      </Flex>
    </Card>
  );
};

export default CurrencyCard;