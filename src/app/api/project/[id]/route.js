import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const { id } = params;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  // Create folder if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  try {
    const files = fs.readdirSync(uploadDir);
    const matchingFiles = files.filter(file => file.startsWith(id + '-'));

    // Use hardcoded base URL or request origin fallback
    const baseURL = 'https://uxqa-backend.onrender.com'; // ✅ hardcoded to ensure full URLs work
    const frameUrls = matchingFiles.map(file => `${baseURL}/uploads/${file}`);

    return new Response(
      JSON.stringify({
        projectId: id,
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
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
