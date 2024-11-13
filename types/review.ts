import { GatheringType, Gathering, LocationType, SortType } from './gathering';

export type Review = {
  teamId: string;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering: Omit<
    Gathering,
    'registrationEnd' | 'participantCount' | 'capacity' | 'createdBy' | 'canceledAt'
  >;
  User: {
    teamId: string;
    id: number;
    name: string;
    image: string | null;
  };
};

export type GatheringReview = {
  gatheringId: number;
  score: number;
  comment: string;
};

export type Points = {
  teamId: string;
  type: GatheringType;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
  averageScore: number;
};

export type reviewQueryKeys = [
  ['reviews'],
  {
    type: GatheringType;
    location?: LocationType;
    sortBy?: SortType;
    date?: string;
  },
];

export type reviewScoresQueryKeys = [
  ['reviews', 'scores'],
  {
    type: GatheringType;
    location?: LocationType;
    sortBy?: SortType;
    date?: string;
  },
];

export type sortBy = 'createdAt' | 'score' | 'participantCount' | 'dateTime' | 'registrationEnd';

export type paramsType = {
  id?: string;
  type: GatheringType;
  sortOrder: 'desc' | 'asc';
  location?: LocationType;
  date?: string;
  createdBy?: number;
  sortBy?: sortBy;
  limit?: 10;
};
