import { User, createClient } from '@supabase/supabase-js';
import { Profile, UserHighscore } from './types';

const url = process.env.SUPABASE_URL!;
const key = process.env.SUPABASE_KEY!;

export const supabase = createClient(url, key);

export const getHighscores = async (): Promise<UserHighscore[]> => {
  const { data } = await supabase.rpc('get_weekly_highscores', {
    number_of_rows: 10,
    score_date: '2023-09-05',
  });
  return data;
};

export const getUserWeeklyHighscore = async (): Promise<UserHighscore[]> => {
  const { data } = await supabase.rpc('get_user_weekly_highscore', {
    score_date: '2023-09-05',
  });
  return data;
};

export const getUser = async (): Promise<User | null> => {
  const response = await supabase.auth.getUser();

  if (response.error) return null;

  return response.data.user;
};

export const getProfile = async (): Promise<Profile | null> => {
  const user = await getUser();

  if (!user) return null;

  const { data } = await supabase
    .from('profiles')
    .select()
    .match({ id: user.id });

  if (!data || data.length === 0) return null;

  return data[0];
};
