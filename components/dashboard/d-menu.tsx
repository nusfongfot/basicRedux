import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useRouter } from "next/router";

type MenuItem = {
  label: string;
  icon: any;
  href: string;
};

export const MainListItems = () => {
  const router = useRouter();
  const menuItem: Array<MenuItem> = [
    {
      label: "หน้าหลัก",
      icon: <DashboardIcon />,
      href: "/dashmenu/t?type=home",
    },
    {
      label: "ยืนใบลา",
      icon: <PeopleIcon />,
      href: "/dashmenu/t?type=d-leave",
    },
    {
      label: "จัดการข้อมูลการลา",
      icon: <BarChartIcon />,
      href: "/dashmenu/t?type=d-manage-leave",
    },
  ];
  return (
    <React.Fragment>
      {menuItem.map((menu, i) => {
        return (
          <ListItemButton
            onClick={() => router.push(menu.href)}
            key={i}
            sx={{
              backgroundColor: router.pathname === menu.href ? "grey" : "",
            }}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.label} />
          </ListItemButton>
        );
      })}
    </React.Fragment>
  );
};
