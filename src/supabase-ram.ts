import { User, createClient } from '@supabase/supabase-js';
import { Profile, UserHighscore } from './types';

const url = process.env.SUPABASE_URL!;
const key = process.env.SUPABASE_KEY!;

export const supabase = createClient(url, key);

export const getDate = (): string => {
  const formattedDate = new Date().toISOString().split('T')[0];
  return formattedDate;
};

export const getHighscores = async (): Promise<UserHighscore[]> => {
  const { data, error } = await supabase.rpc('get_weekly_highscores', {
    number_of_rows: 10,
    score_date: getDate(),
  });

  if (error || !data) return [];

  return data;
};
export const getAllTimeHighscores = async (): Promise<UserHighscore[]> => {
  const { data, error } = await supabase.rpc('get_highscores', {
    number_of_rows: 1,
  });

  if (error || !data) return [];

  return data;
};

export const getUserWeeklyHighscore =
  async (): Promise<UserHighscore | null> => {
    const { data, error } = await supabase.rpc('get_user_weekly_highscore', {
      score_date: getDate(),
    });

    if (error || !data) return null;

    return data;
  };

export const getUserGlobalHighscore =
  async (): Promise<UserHighscore | null> => {
    const { data, error } = await supabase.rpc('get_user_highscore');

    if (error || !data) return null;

    return data;
  };

export const insertScore = async (score: number) => {
  const { error } = await supabase.from('highscores').insert({
    score: score,
  });

  console.log(error);
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
    .match({ user_id: user.id });

  if (!data || data.length === 0) return null;

  return data[0];
};
