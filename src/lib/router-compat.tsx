/**
 * Compatibility layer so the ported pages/components keep using a familiar
 * router API while the app runs on TanStack Router.
 */
import {
  Link as TanstackLink,
  Navigate as TanstackNavigate,
  useNavigate as useTanstackNavigate,
  useParams as useTanstackParams,
  useLocation as useTanstackLocation,
} from "@tanstack/react-router";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

type LinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  to: string;
  replace?: boolean;
  state?: unknown;
};

/** Anchor-compatible Link that routes through TanStack Router. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, replace, state: _state, ...rest }, ref) => (
    <TanstackLink ref={ref} to={to} replace={replace} {...rest} />
  ),
);
Link.displayName = "Link";

export type NavigateFn = (to: string | number, options?: { replace?: boolean }) => void;

/** react-router-style navigate(path) / navigate(-1). */
export function useNavigate(): NavigateFn {
  const navigate = useTanstackNavigate();
  return (to, options) => {
    if (typeof to === "number") {
      if (typeof window !== "undefined") window.history.go(to);
      return;
    }
    void navigate({ to, replace: options?.replace });
  };
}

export function useParams<T extends Record<string, string> = Record<string, string>>(): Partial<T> {
  return (useTanstackParams as (opts: { strict: false }) => unknown)({
    strict: false,
  }) as Partial<T>;
}

export function useLocation() {
  const location = useTanstackLocation();
  return {
    pathname: location.pathname,
    search: location.searchStr,
    hash: location.hash,
    state: location.state,
  };
}

export type NavLinkRenderState = { isActive: boolean; isPending: boolean };

export type NavLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "className"> & {
  to: string;
  end?: boolean;
  className?: string | ((state: NavLinkRenderState) => string);
};

/** react-router-style NavLink with an isActive-aware className. */
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, end, className, ...rest }, ref) => {
    const { pathname } = useLocation();
    const isActive = end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);
    const resolved =
      typeof className === "function" ? className({ isActive, isPending: false }) : className;
    return <TanstackLink ref={ref} to={to} className={resolved} {...rest} />;
  },
);
NavLink.displayName = "NavLink";


/** Declarative redirect, react-router style. */
export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  return <TanstackNavigate to={to} replace={replace} />;
}

/** Minimal URLSearchParams-based replacement for react-router's useSearchParams. */
export function useSearchParams(): [URLSearchParams, (next: URLSearchParams | Record<string, string>) => void] {
  const location = useTanstackLocation();
  const navigate = useTanstackNavigate();
  const params = new URLSearchParams(location.searchStr);
  const setParams = (next: URLSearchParams | Record<string, string>) => {
    const search = next instanceof URLSearchParams ? next : new URLSearchParams(next);
    void navigate({ to: location.pathname, search: Object.fromEntries(search.entries()) });
  };
  return [params, setParams];
}
