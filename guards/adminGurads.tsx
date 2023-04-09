import Dlayout from "@/components/dashboard/d-layout";
import { firebaseApp } from "@/configs/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

function AdminGuards() {
  const auth = getAuth(firebaseApp);
  const router = useRouter();
  const [account, setAccount] = useState(null);

  if (!account) {
    return router.push("signin");
  }
  return <Dlayout />;
}
export default AdminGuards;
