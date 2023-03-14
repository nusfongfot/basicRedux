import { useRouter } from "next/router";
import DLeave from "../../components/dashboard/d-leave";
import DManageLeave from "../../components/dashboard/d-manage-leave";
import Dlayout from "../../components/dashboard/d-layout";
import { firebaseApp } from "@/configs/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function DashPage() {
  const router = useRouter();
  const auth = getAuth(firebaseApp);
  const [account, setAccount] = useState(null);

  if (typeof window !== "undefined") {
    if (!account) {
      return window.location.replace("/signin");
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAccount(user);
      } else {
        setAccount(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {router.query.type === "home" ? <Dlayout /> : null}
      {router.query.type === "d-leave" ? <DLeave /> : null}
      {router.query.type === "d-manage-leave" ? <DManageLeave /> : null}
    </>
  );
}
