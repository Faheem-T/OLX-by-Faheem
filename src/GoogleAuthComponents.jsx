export function GoogleAuthConfig() {
  return (
    <div
      id="g_id_onload"
      data-client_id="1009146002259-qhok5alrch6qor02ejnrll77fqdh9t0b.apps.googleusercontent.com"
      data-context="signin"
      data-ux_mode="popup"
      data-callback="handleSignInWithGoogle"
      data-itp_support="true"
      data-use_fedcm_for_prompt="true"
    ></div>
  );
}
export function GoogleAuthButton() {
  return (
    <div
      className="g_id_signin"
      data-type="standard"
      data-shape="pill"
      data-theme="outline"
      data-text="signin_with"
      data-size="large"
      data-logo_alignment="left"
    ></div>
  );
}
