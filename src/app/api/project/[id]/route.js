import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const { id } = params;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  try {
    const files = fs.readdirSync(uploadDir);
    const matchingFiles = files.filter(file => file.startsWith(id + '-'));
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const frameUrls = matchingFiles.map(file => `${origin}/uploads/${file}`);

    return new Response(
      JSON.stringify({
        projectId: id,
        frames: frameUrls
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}
