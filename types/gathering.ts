import { gatheringSchema } from '@/constants/formSchema';
import { gatherings, locations, sorts } from '@/constants/gathering';
import { Control } from 'react-hook-form';
import { myPageFilter, myPageSubTab } from '@/constants/gathering';
export type GatheringType = keyof typeof gatherings;
export type LocationType = keyof typeof locations;
export type SortType = keyof typeof sorts;
export type myPageFilterType = keyof typeof myPageFilter;
export type myPageSubType = keyof typeof myPageSubTab;
export type myPageFilterNameType = '나의 모임' | '나의 리뷰' | '내가 만든 모임';
export type myPageSubTabType = '작성 가능한 리뷰' | '작성한 리뷰';

export type Gathering = {
  teamId: string;
  id: number;
  type: GatheringType;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: LocationType;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt: string | null;
};

export type myGatheringQueryKeys = [['gathering', 'joined']];

export type participantQueryKeys = [['gathering', 'participants'], { id: number }];
export type gatheringReviewQueryKeys = [['gathering', 'reviews'], { id: number }];

export type gatheringDetailQueryKeys = [['gathering'], { id: number }];

export type gatheringQueryKeys = [
  ['gathering'],
  {
    type: GatheringType;
    location?: LocationType;
    sortBy?: SortType;
    date?: string;
    createdBy?: number;
  },
];

export type savedGatheringQueryKeys = [
  ['gathering', 'saved'],
  {
    type: GatheringType;
    location?: LocationType;
    sortBy?: SortType;
    date?: string;
  },
];

export type JoinedGathering = {
  teamId: string;
  id: number;
  type: GatheringType;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: LocationType;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt: string | null;
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
};

export type Participant = {
  teamId: string;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: {
    id: number;
    email: string;
    name: string;
    companyName: string;
    image?: string;
  };
};

export type ControlProps = {
  control: Control<gatheringSchema>;
};
