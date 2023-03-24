import { selectAuthState } from "@/reduxToolkit/auth/authSlice";
import { useAppSelector } from "@/reduxToolkit/hooks";

export const useAccount = () => {
  const { account } = useAppSelector(selectAuthState);

  return { account };
};
