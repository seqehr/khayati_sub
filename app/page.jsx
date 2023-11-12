import Login from "./components/Login";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
const LoginPage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token && typeof token.value === "string") {
    redirect("/dash");
  } else
    return (
      <>
        <Login />
      </>
    );
};

export default LoginPage;
