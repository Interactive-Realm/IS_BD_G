export type UserHighscore = {
  user_id: string;
  first_name: string;
  last_name: string;
  highscore: number;
};

export type Profile = {
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
};

export type Prize = {
  name: string;
  message: string;
};

export type MenuType = 'start' | 'game' | 'end';

export type Balloon = {
  id: number;
  x: number;
  y: number;
  speed: number;
  class: string;
};
