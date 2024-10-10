import { data } from './data';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  try {
    return new Response(JSON.stringify({ data }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('400 failed.', {
      status: 400,
    });
  }
}
