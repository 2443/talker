import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import SearchBox from '../components/SearchBox';

const Room = () => {
  return (
    <AppLayout index='2'>
      <SearchBox />
    </AppLayout>
  );
};

export default Room;
