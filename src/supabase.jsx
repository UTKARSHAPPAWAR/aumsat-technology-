// src/supabase.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jgsujfftxpnhexogqacq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnc3VqZmZ0eHBuaGV4b2dxYWNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3OTY4ODUsImV4cCI6MjAyMjM3Mjg4NX0.iAKcdLxXSwpJJnakGavppzVo_kYuOpTWCtEOtpEc-qY'
);

export default supabase;
