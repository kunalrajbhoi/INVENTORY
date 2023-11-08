import jwt from "jsonwebtoken";
import Store from '../models/Store.js'

// Added a second parameter `roles` which is an array of roles that are allowed to authenticate.
const requireAuth = async (context, roles = []) => {
  const authHeader = context.req.headers.authorization;

  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const store = await Store.findById(decoded._id);

    if (!store) {
      throw new Error("Store not found");
    }

    // This is a new block of code. It checks if the authenticated store's role is in the allowed roles array.

    if (roles.length && !roles.some((role) => store.role.includes(role))) {
      throw new Error("Unauthorized");
    }

    return store;
  } catch (error) {
    throw new Error(error.message);
  }
};

// `authenticate` now takes an array of roles as a parameter.
const authenticate =
  (roles = []) =>
  (next) =>
  async (root, args, context, info) => {
    // Pass the `roles` to `requireAuth`.
    await requireAuth(context, roles);
    return next(root, args, context, info);
  };

export default authenticate;
