import React from "react";
import { Redirect } from "react-router-dom";

import Index from "@/pages/index";
import Order from "@/pages/order";
import User from "@/pages/user";
import Detail from "@/pages/detail";

const routes = [
  {
    path: "/",
    title: "首页",
    exact: true,
    component: Index,
  },
  {
    path: "/order",
    title: "订单",
    exact: true,
    component: Order,
  },
  {
    path: "/user",
    title: "我的",
    exact: true,
    component: User,
  },
  {
    path: "/detail",
    title: "详情",
    exact: true,
    component: Detail,
  },
  {
    path: "*",
    render: () => {
      return <Redirect to="/" />;
    },
  },
];

export default routes;
