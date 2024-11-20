import { useJoinedGatheringInfiniteQuery, useMyGatheringInfiniteQuery } from '@/services/gathering';
import useFilterStore from '@/stores/filterStore';
import useModal from '@/hooks/useModal';
import { gatheringQueryKeys, savedGatheringQueryKeys } from '@/types/gathering';
import { paramsType, reviewQueryKeys, reviewScoresQueryKeys } from '@/types/review';
import { convertSortType } from '@/utils/convertData';
import { useMyPageFilterStore } from '@/stores/myPageFilterStore';
import { useReviewsInfiniteQuery } from '@/services/reviews';

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

// export const useMyPageParams = ({ userId }: { userId: number }) => {
//   const { type: myPageType, subTab } = useMyPageFilterStore();
//   const { modalRef, handleOpenModal, handleCloseModal } = useModal();
//   const {
//     data: joinedGatheringsData,
//     fetchNextPage: joinedGatheringsFetchNextPage,
//     isFetching: joinedGatheringsIsFetching,
//     hasNextPage: joinedGatheringsHasNextPage,
//   } = useJoinedGatheringInfiniteQuery({
//     userId,
//     reviewed: false,
//   });
//   const {
//     data: myGatheringsData,
//     fetchNextPage: myGatheringsFetchNextPage,
//     isFetching: myGatheringsIsFetching,
//     hasNextPage: myGatheringsHasNextPage,
//   } = useMyGatheringInfiniteQuery({
//     userId,
//   });
//   const {
//     data: writtenReviewData,
//     fetchNextPage: writtenReviewFetchNextPage,
//     isFetching: writtenReviewIsFetching,
//     hasNextPage: writtenReviewHasNextPage,
//   } = useReviewsInfiniteQuery([['reviews'], { userId }], { userId, limit: 10 });
//   let data = joinedGatheringsData;
//   let fetchNextPage = joinedGatheringsFetchNextPage;
//   let isFetching = joinedGatheringsIsFetching;
//   let hasNextPage = joinedGatheringsHasNextPage;
//   switch (myPageType) {
//     case 'joined':
//       data = joinedGatheringsData;
//       fetchNextPage = joinedGatheringsFetchNextPage;
//       isFetching = joinedGatheringsIsFetching;
//       hasNextPage = joinedGatheringsHasNextPage;
//       console.log('joined data = ', data);
//       break;
//     case 'review':
//       if (subTab === 'available') {
//         data = joinedGatheringsData;
//         fetchNextPage = joinedGatheringsFetchNextPage;
//         isFetching = joinedGatheringsIsFetching;
//         hasNextPage = joinedGatheringsHasNextPage;
//       } else {
//         data = writtenReviewData;
//         fetchNextPage = writtenReviewFetchNextPage;
//         isFetching = writtenReviewIsFetching;
//         hasNextPage = writtenReviewHasNextPage;
//         isFetching = myGatheringsIsFetching;
//       }

//       console.log('available data = ', data);
//       break;
//     case 'createdBy':
//       data = myGatheringsData;
//       fetchNextPage = myGatheringsFetchNextPage;
//       hasNextPage = myGatheringsHasNextPage;
//       console.log('myPage data = ', data);
//       break;
//   }
//   return {
//     modalRef,
//     handleOpenModal,
//     handleCloseModal,
//     data,
//     fetchNextPage,
//     isFetching,
//     hasNextPage,
//   };
// };
