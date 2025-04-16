import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnnlrccdrqkywbsbiviu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndubmxyY2NkcnFreXdic2Jpdml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTQ4NTEsImV4cCI6MjA2MDM5MDg1MX0.rt_s0op16M86GRcaACLxCE04T-qL4T1of8Mfa6pzQ7o';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request, { params }) {
  const { id: projectId } = params;

  const { data, error } = await supabase.storage
    .from('uxqa-frames')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const matchingFiles = data.filter(file => file.name.startsWith(projectId + '-'));
  const frameUrls = matchingFiles.map(file =>
    `${supabaseUrl}/storage/v1/object/public/uxqa-frames/${file.name}`
  );

  return new Response(
    JSON.stringify({
      projectId,
      frames: frameUrls,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
