import { selectAuthState } from "@/reduxToolkit/auth/authSlice";
import { useAppSelector } from "@/reduxToolkit/hooks";

function DHome() {
  const { account } = useAppSelector(selectAuthState);

  return (
    <div>ยินดีต้อนรับ {account?.firstname}</div>
  )
}
export default DHome