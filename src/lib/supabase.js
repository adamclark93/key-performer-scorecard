import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iklkdcrdvimwwlrhxrjz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrbGtkY3Jkdmltd3dscmh4cmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NjcxOTQsImV4cCI6MjA4OTM0MzE5NH0.2bbbOxlbm8inlmdb68CAKlculmXFKC2IWBdi2VAF4Ys';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveLead(userData, result, answers) {
  const { error } = await supabase.from('leads').insert({
    first_name:          userData.firstName,
    last_name:           userData.lastName,
    email:               userData.email,
    phone:               userData.phone,
    job_level:           userData.jobLevel,
    industry:            userData.industry,
    quadrant:            result.quadrant,
    overall_pct:         result.overallPct,
    perspective_score:   Math.round((result.subScores.perspective / 100) * 5),
    pace_score:          Math.round((result.subScores.pace / 100) * 5),
    profile_score:       Math.round((result.subScores.profile / 100) * 5),
    performance_score:   Math.round((result.subScores.performance / 100) * 5),
    progress_score:      Math.round((result.subScores.progress / 100) * 5),
    answers:             answers,
  });

  if (error) console.error('Supabase insert error:', error);
}
