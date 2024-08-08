import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="flex justify-center flex-col min-h-screen items-center gap-5">
      <h1 className="font-bold text-2xl">Oops!</h1>
      <p className="font-semibold">Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-gray-400">{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
