/**
 * add new user to users array
 *
 * @param userName:string
 * @param userImage:object
 * @return {dispatch} Type + payload.
 */
 export function addUser(userName, userImage) {
   return {
      type: "ADD_USER",
      payload: { userName, userImage },
    };
  }
  
