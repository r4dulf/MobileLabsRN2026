import type { NewsItem } from '../data/newsData';

export type NewsStackParamList = {
  MainScreen: undefined;
  DetailsScreen: { item: NewsItem };
};

export type DrawerParamList = {
  News: undefined;
  Contacts: undefined;
};
