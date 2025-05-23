const AdminRouter = [
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "",
        element: <AdminIndex />,
      },
    ],
  },
];
