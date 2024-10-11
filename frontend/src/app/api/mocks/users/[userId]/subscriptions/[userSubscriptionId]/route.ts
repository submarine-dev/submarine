import { data } from './data';

export const GET = async (): Promise<Response> => {
  return new Response(JSON.stringify({ data }), {
    status: 200,
  });
};
