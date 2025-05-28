import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://okxvgkdrkpyiphepggkb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9reHZna2Rya3B5aXBoZXBnZ2tiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzM2NTg5MywiZXhwIjoyMDYyOTQxODkzfQ.VBA_nQ7XqlpNpWpL0jcq5A2xmMKzGPWtsGwsT3c7mL4';
export const supabase = createClient(supabaseUrl, supabaseKey);