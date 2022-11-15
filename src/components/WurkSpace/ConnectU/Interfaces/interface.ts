export interface ICard {
  id: number;
  title: string;
  date: string;
}
export interface IBoard {
  id: number;
  title: string;
  cards: ICard[];
}
