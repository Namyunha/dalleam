import { useJoinedGatheringInfiniteQuery, useMyGatheringInfiniteQuery } from '@/services/gathering';
import useFilterStore from '@/stores/filterStore';
import useModal from '@/hooks/useModal';
import { gatheringQueryKeys, JoinedGathering, savedGatheringQueryKeys } from '@/types/gathering';
import { paramsType, reviewQueryKeys, reviewScoresQueryKeys } from '@/types/review';
import { User } from '@/types/user';
import { convertSortType } from '@/utils/convertData';
import { useMyPageFilterStore } from '@/stores/myPageFilterStore';
import { useReviewsInfiniteQuery } from '@/services/reviews';
import { InfiniteData } from '@tanstack/react-query';

export const useParams = ({ isGathering }: { isGathering: boolean }) => {
  const { type, location, date, reviewSortBy, sortBy } = useFilterStore();
  let queryKeys = { type, location, date, sortBy: isGathering ? sortBy : reviewSortBy };
  let gatheringQueryKeys: gatheringQueryKeys = [['gathering'], queryKeys];
  let savedGatheringQueryKeys: savedGatheringQueryKeys = [['gathering', 'saved'], queryKeys];
  let reviewQueryKeys: reviewQueryKeys = [['reviews'], queryKeys];
  let reviewScoresQueryKeys: reviewScoresQueryKeys = [['reviews', 'scores'], queryKeys];
  let params: paramsType = {
    limit: 10,
    type,
    sortOrder: 'desc',
    location: location === '지역 선택' ? undefined : location,
    date: date === '날짜 선택' ? undefined : date,
    sortBy: convertSortType(isGathering ? sortBy : reviewSortBy),
  };
  return {
    params,
    reviewQueryKeys,
    reviewScoresQueryKeys,
    gatheringQueryKeys,
    savedGatheringQueryKeys,
  };
};

export const useMyPageParams = ({ userId }: { userId: number }) => {
  const { type: myPageType, subTab } = useMyPageFilterStore();
  const { modalRef, handleOpenModal, handleCloseModal } = useModal();

  const {
    data: joinedGatheringsData,
    fetchNextPage: joinedGatheringsFetchNextPage,
    isFetching: joinedGatheringsIsFetching,
    hasNextPage: joinedGatheringsHasNextPage,
  } = useJoinedGatheringInfiniteQuery({
    userId,
    reviewed: myPageType && subTab === 'written',
  });

  const {
    data: myGatheringsData,
    fetchNextPage: myGatheringsFetchNextPage,
    isFetching: myGatheringsIsFetching,
    hasNextPage: myGatheringsHasNextPage,
  } = useMyGatheringInfiniteQuery({
    userId,
  });

  const {
    data: writtenReviewData,
    fetchNextPage: writtenReviewFetchNextPage,
    isFetching: writtenReviewIsFetching,
    hasNextPage: writtenReviewHasNextPage,
  } = useReviewsInfiniteQuery([['reviews'], { userId }], { userId, limit: 10 });

  // const data = myPageType === 'joined' ? joinedGatheringsData : myGatheringsData
  let data =
    myPageType === 'review' && subTab === 'available' ? joinedGatheringsData : writtenReviewData;
  data = myPageType === 'joined' ? joinedGatheringsData : myGatheringsData;

  let fetchNextPage =
    myPageType === 'review' && subTab === 'available'
      ? joinedGatheringsFetchNextPage
      : writtenReviewFetchNextPage;
  fetchNextPage =
    myPageType === 'joined' ? joinedGatheringsFetchNextPage : myGatheringsFetchNextPage;

  let isFetching =
    myPageType === 'review' && subTab === 'available'
      ? joinedGatheringsIsFetching
      : writtenReviewIsFetching;
  isFetching = myPageType === 'joined' ? joinedGatheringsIsFetching : myGatheringsIsFetching;

  let hasNextPage =
    myPageType === 'review' && subTab === 'available'
      ? joinedGatheringsHasNextPage
      : writtenReviewHasNextPage;
  hasNextPage = myPageType === 'joined' ? joinedGatheringsHasNextPage : myGatheringsHasNextPage;

  return {
    modalRef,
    handleOpenModal,
    handleCloseModal,
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
  };
};
