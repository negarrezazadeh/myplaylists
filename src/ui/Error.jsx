import { Link } from "react-router-dom";
import { Button } from "./button";

function Error({ error }) {
  let message = "Sorry some thing went wrong 😞";
  if (error?.status === 404) {
    message = "Nothing found";
  }
  return (
    <div className="flex flex-col gap-y-4 px-4 py-11">
      <p className="text-center font-bold capitalize">{message}</p>

      <p className="text-center font-bold capitalize"></p>
      <Button onClick={() => window.location.reload()}>Reload Page</Button>
      <Button asChild>
        <Link to="/">Go To Home</Link>
      </Button>
    </div>
  );
}

export default Error;
