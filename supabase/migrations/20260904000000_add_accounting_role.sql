-- Add the least-privilege billing role to the existing role model.
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'accounting';

-- Admin-only role assignment helper. It never grants roles to non-admin callers.
CREATE OR REPLACE FUNCTION public.set_user_role(_user_id UUID, _role public.app_role)
RETURNS public.user_roles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result public.user_roles;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Administrator access required';
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, _role)
  ON CONFLICT (user_id, role) DO UPDATE SET role = EXCLUDED.role
  RETURNING * INTO result;

  RETURN result;
END;
$$;

REVOKE ALL ON FUNCTION public.set_user_role(UUID, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.set_user_role(UUID, public.app_role) TO authenticated, service_role;
