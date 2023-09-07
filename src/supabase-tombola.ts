import { createClient } from '@supabase/supabase-js';
import { Prize } from './types';

const url = process.env.SUPABASE_URL_TOMBOLA!;
const key = process.env.SUPABASE_KEY_TOMBOLA!;

export const supabaseTombola = createClient(url, key);

export const getPrice = async (): Promise<Prize | null> => {
  const { data, error } = await supabaseTombola.rpc('get_price');

  if (error || !data) return null;

  return data;
};
