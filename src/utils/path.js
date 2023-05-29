export const auth = {
  login: "/auth/login",
  register: "/auth/register",
  reset: "/auth/password",
};

export const labs = "/labs";

export const classes = "/classes";

export const classUsers = (classId) => `/class/${classId}/users`;

export const users = "/users";

export const computers = "/computers";

export const schedules = "/schedules";

export const roles = "/roles";

export const info = "/me";
