import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('frame');
  const projectId = formData.get('project_id') || 'default';

  if (!file || typeof file === 'string') {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = file.name.split('.').pop();
  const filename = `${projectId}-${uuid()}.${ext}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

  await writeFile(filePath, buffer);

  // ✅ Return full URL for use in overlays
  const imageUrl = `https://uxqa-backend.onrender.com/uploads/${filename}`;

  return new Response(
    JSON.stringify({
      imageUrl,
      projectId
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}
