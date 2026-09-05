import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    // FIXED: Removed 'https: true' to let the basicSsl() plugin handle encryption cleanly
    port: 5173
  }
});
