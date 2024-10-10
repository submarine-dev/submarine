'use strict';

import { data } from './data';

export async function GET(request: Request) {
  try {
    if (request.method !== 'GET') {
      return new Response('Only GET allowed', {
        status: 405,
      });
    }
    // // ex: /api/mocks/subcriptions?results=10
    // const url = new URL(request.url);
    // const results = url.searchParams.get('results');
    // // もしNumberに変換できない文字列が渡された場合は、NaNが返る
    // const numResults = Number(results);
    // if (isNaN(numResults)) {
    //   return new Response(
    //     'results query parameter is invalid',
    //     {
    //       status: 400,
    //     }
    //   );
    // }

    const numResults = 10;

    const mockData = data;
    if (numResults) {
      const sliceNum =
        numResults > mockData.subscriptionMaster.length
          ? mockData.subscriptionMaster.length
          : numResults;

      const subscriptionList =
        mockData.subscriptionMaster.slice(0, sliceNum);
      const responseData = {
        subscriptionMaster: subscriptionList,
      };

      return new Response(JSON.stringify(responseData), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify(mockData), {
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response('400 failed.', {
      status: 400,
    });
  }
}
