import { useAccount } from "@/hooks/use-account";
import { Box } from "@mui/material";

function DHome() {
  const { account } = useAccount();
  return (
    <Box>
      <Box>ยินดีต้อนรับ {account?.firstname}</Box>
      <Box>Role: {account?.role}</Box>
    </Box>
  );
}
export default DHome;
