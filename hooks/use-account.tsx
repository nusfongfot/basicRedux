import { selectAuthState } from "@/reduxToolkit/auth/authSlice";
import { useAppSelector } from "@/reduxToolkit/hooks";
import { logoutUser } from "@/services/auth.service";
import { useRouter } from "next/router";

export const useAccount = () => {
  const router = useRouter();
  const { account } = useAppSelector(selectAuthState);

  const gotoLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  const gotoProfilePage = () => {
    router.push("/editprofile");
  };

  return { account, gotoLogout, gotoProfilePage };
};
