import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Fetch from "../Helpers/Fetch";
import Dash from "../components/Dash";
const DashPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token && typeof token.value === "string") {
    // const data = await fetch(token.value);
    return <Dash />;
    // return JSON.stringify(data);

    // if (data.data == 0)
    //   return redirect(`https://lezatkhayati.com/api/sub/pay/${token.value}`);
    // else return <Dash />;
  } else return redirect("/");
};

export default DashPage;

const fetch = async (token) =>
  Fetch({ url: "sub/isSub", token: token })
    .then((result) => result.json())
    .then((res) => {
      return res;
    });
