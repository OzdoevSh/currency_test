import { useEffect, useState } from 'react';
import { Button, Row, Col, Typography, Flex, Spin } from 'antd';
import moment from 'moment';
import CurrencyCard from './components/CurrencyCard/CurrencyCard';

import './App.css';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [displayedCurrencies, setDisplayedCurrencies] = useState([]);
  const [today, setToday] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreToShow, setHasMoreToShow] = useState(false);

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(response => response.json())
      .then(data => {
        const currencyData = Object.values(data.Valute).map(currency => ({
          id: currency.ID,
          name: currency.Name,
          charCode: currency.CharCode,
          value: currency.Value.toFixed(4),
          previous: currency.Previous.toFixed(4),
          nominal: currency.Nominal
        }));
        setCurrencies(currencyData);
        setToday(data.Date);
        setHasMoreToShow(true);
        setDisplayedCurrencies(currencyData.slice(0, 20));
      });
  }, []);

  const handleLoadMore = () => {
    setLoadingMore(true);
    const startIndex = displayedCurrencies.length;
    const endIndex = startIndex + 20;
    const newBatch = currencies.slice(startIndex, endIndex);
    setDisplayedCurrencies([...displayedCurrencies, ...newBatch]);
    setLoadingMore(false);
    if (endIndex >= currencies.length) {
      setHasMoreToShow(false);
    }
  };

  return (
    <Flex vertical className='home'>
      <Flex className='toolbar' justify='space-between' align='center'>
        <Typography.Text className='toolbar-text' strong level={2}>Курсы валют</Typography.Text>
        {today && (
          <Typography.Text className='toolbar-text' strong level={3}>
            Дата: {moment(today).format('DD.MM.YYYY')}
          </Typography.Text>
        )}
      </Flex>

      {displayedCurrencies.length > 0 ? (
        <>
          <Row className='list' gutter={[24, 24]}>
            {displayedCurrencies.map(currency => (
              <Col key={currency.id} xs={24} sm={12} md={12} lg={12} xl={8} xxl={6}>
                <CurrencyCard currency={currency} />
              </Col>
            ))}
          </Row>
          {hasMoreToShow && (
            <Flex justify='center' style={{ marginBottom: '24px' }}>
              <Button 
                type='primary'
                size='large'
                ghost
                loading={loadingMore}
                onClick={handleLoadMore}
              >
                Загрузить ещё
              </Button>
            </Flex>
          )}
        </>
      ) : (
        <Spin size='large' style={{ marginTop: '36px' }} />
      )}
    </Flex>
  );
}

export default App;