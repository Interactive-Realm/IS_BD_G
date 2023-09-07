import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin([
      'SUPABASE_URL',
      'SUPABASE_KEY',
      'SUPABASE_URL_TOMBOLA',
      'SUPABASE_KEY_TOMBOLA',
    ]),
  ],
});
