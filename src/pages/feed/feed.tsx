import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getFeed } from '../../slices/feedSlice';
import { selectFeed, selectFeedLoading } from '../../services/selectors';

export const Feed: FC = () => {
  const feed = useSelector(selectFeed);
  const loading = useSelector(selectFeedLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (loading || !feed) {
    return <Preloader />;
  }
  return (
    <FeedUI orders={feed.orders} handleGetFeeds={() => dispatch(getFeed())} />
  );
};
