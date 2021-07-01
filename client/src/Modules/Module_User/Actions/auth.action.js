/**
 * Save user details from register form after validation
 *
 * @param userName:string
 * @param userImage:object
 * @return {dispatch} Type + payload.
 */
export function register(userName, userImage) {
  return {
    type: "REGISTER",
    payload: { userName, userImage },
  };
}
