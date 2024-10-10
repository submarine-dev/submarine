import { NextPage } from 'next';

const ErrorPage: NextPage<{ statusCode: number }> = ({
  statusCode,
}) => {
  return (
    <div>
      <h1>Error {statusCode}</h1>
      <p>Oops! Something went wrong.</p>
    </div>
  );
};

export default ErrorPage;
