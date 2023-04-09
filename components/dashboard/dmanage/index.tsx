import { useAccount } from "@/hooks/use-account";
import { Typography } from "@mui/material";

function DLeaveManagement() {
  const { account } = useAccount();

  if (account?.role !== "admin") {
    return (
      <Typography variant="h5">
        ไม่มีสิทธ์เข้าถึงหน้านี้ เฉพาะ Admin เท่านั้น
      </Typography>
    );
  }

  return <div>DLeaveManagement</div>;
}
export default DLeaveManagement;
