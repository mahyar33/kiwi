import React, { useRef, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { actions, reducer, sliceKey } from './slice';
import { bookingSaga } from './saga';
import { selectLocationList, selectFlightList } from './selector';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { LoadingWrapper } from '../../components/LoadingIndicator/styles';
import { Wrapper } from './styles';
import { Container } from './styles';
import { Form } from './styles';
import { Input } from '../../components/Input';
import { Selector } from '../../components/Selector';
import { Table } from '../../components/Table';
import { Booking, BookingParam, Location } from './types';
import { Button } from '../../components/Button';
import { formatDate } from '../../../utils/general';

const thead = [
  {
    dataField: 'id',
    text: '#',
  },
  {
    dataField: 'cityFrom',
    text: 'From',
  },
  {
    dataField: 'cityTo',
    text: 'To',
  },
  {
    dataField: 'dTime',
    text: 'Date And Time',
  },
  {
    dataField: 'price',
    text: 'Price',
  },
];

export function HomePage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: bookingSaga });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const result = useSelector(selectFlightList);
  const locations = useSelector(selectLocationList);
  const timer = useRef<number>();
  const [expanded, setExpanded] = useState<string>('');
  const [params, setParams] = useState<Booking<BookingParam>>({
    flyFrom: { value: '', display: '' },
    flyTo: { value: '', display: '' },
    dateFrom: { value: '', display: '' },
    dateTo: { value: '', display: '' },
    partner: 'skypicker',
  });

  const convertDataTable = data => {
    return data.map((item, key) => {
      const { cityFrom, cityTo, dTime, price } = item;
      return {
        id: key,
        cityFrom: cityFrom,
        cityTo: cityTo,
        dTime: `${dTime.date} At ${dTime.time}`,
        price: `${price} €`,
      };
    });
  };

  const handleSelectorChange = (event, name): void => {
    const { value } = event.target;
    clearTimeout(timer.current);
    timer.current = setTimeout(function () {
      if (value) dispatch(actions.getLocationList(value));
    }, 500);
    setExpanded(value ? name : '');
    setParams({
      ...params,
      [name]: {
        value: '',
        display: value,
      },
    });
  };

  const handleSelect = (text: string, value: string, name: string): void => {
    dispatch(actions.setLocationList({ error: '', data: [], loading: false }));
    text = text.split(',')[1].trim();
    setExpanded('');
    setParams({
      ...params,
      [name]: { value: value, display: text },
    });
  };

  const handleChangeData = (event): void => {
    const fromDate = new Date(event.target.value);
    // const toDate = new Date();
    // toDate.setDate(fromDate.getDate() + 1);
    const fromDateString = formatDate(fromDate);
    // const toDateString = formatDate(toDate);
    const { day, month, year } = fromDateString;
    const formatValue = `${day}/${month}/${year}`;
    const formatDisplay = `${year}-${month}-${day}`;
    setParams({
      ...params,
      dateFrom: {
        value: formatValue,
        display: formatDisplay,
      },
      dateTo: {
        value: formatValue,
        display: formatDisplay,
      },
    });
  };

  const handleSubmitForm = (event): void => {
    event.preventDefault();
    dispatch(
      actions.getFlightList({
        partner: params.partner,
        flyFrom: params.flyFrom.value,
        flyTo: params.flyTo.value,
        dateFrom: params.dateFrom.value,
        dateTo: params.dateTo.value,
      }),
    );
  };
  const convertLocations = useCallback(
    (data: Array<Location>) => {
      return data.map(item => {
        const temp = { text: '', value: '', id: 0 };
        temp.text = `${item.countryName} , ${item.city}`;
        temp.value = item.code;
        temp.id = item.id;
        return temp;
      });
    },
    [locations.data],
  );
  return (
    <>
      <Helmet>
        <title>{t(translations.headerTitle)}</title>
        <meta name="description" content={t(translations.headerContent)} />
      </Helmet>
      <Wrapper>
        <h1>{t(translations.todos)}</h1>
        <Container>
          <Form onSubmit={handleSubmitForm}>
            <Selector
              name={'flyFrom'}
              placeholder="From"
              options={convertLocations(locations.data!)}
              value={params.flyFrom.display}
              expanded={expanded === 'flyFrom'}
              loading={locations.loading}
              onChange={handleSelectorChange}
              onSelectItem={handleSelect}
            />
            <Selector
              name={'flyTo'}
              placeholder="To"
              options={convertLocations(locations.data!)}
              value={params.flyTo.display}
              expanded={expanded === 'flyTo'}
              loading={locations.loading}
              onChange={handleSelectorChange}
              onSelectItem={handleSelect}
            />
            <Input
              type="date"
              value={params.dateFrom.display}
              onChange={handleChangeData}
            />
            <Button
              text="Search"
              btnColor="#00a991"
              disabled={!params.flyFrom.value.length}
              type="submit"
            />
          </Form>
          {result.data &&
            (result.loading ? (
              <LoadingWrapper key={'loading'}>
                <LoadingIndicator />
              </LoadingWrapper>
            ) : (
              <Table
                key={'table'}
                tHead={thead}
                tBody={convertDataTable(result.data!)}
                noResult={t(translations.noResult)}
              />
            ))}
        </Container>
      </Wrapper>
    </>
  );
}
