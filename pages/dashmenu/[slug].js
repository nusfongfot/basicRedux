import { useRouter } from "next/router";
import DLeave from "../../components/dashboard/d-leave";
import DManageLeave from "../../components/dashboard/d-manage-leave";
import DHome from "../../components/dashboard/d-home";
import Dlayout from "../../components/dashboard/d-layout";

export default function DashPage() {
  const router = useRouter();

  return (
    <>
      {router.query.type === "home" ? <Dlayout /> : null}
      {router.query.type === "d-leave" ? <Dlayout /> : null}
      {router.query.type === "d-manage-leave" ? <DManageLeave /> : null}
    </>
  );
}
