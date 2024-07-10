import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/", "/credits(.*)"]);
const isIgnoredRoute = createRouteMatcher(["/api/webhooks(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isIgnoredRoute(req)) {
    // If the route is in the ignored list, skip the middleware
    return;
  }
  if (isProtectedRoute(req)) {
    // Protect the route if it is in the protected list
    auth().protect();
  }
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
