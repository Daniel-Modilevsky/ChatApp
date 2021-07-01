/**
 * add new local room
 *
 * @param roomName:string
 * @param roomImage:object
 * @return {dispatch} Type + payload.
 */
 export function addRoom(roomName, roomImage) {
     
    return {
      type: "ADD_ROOM",
      payload: { roomName, roomImage, usersNumber: 0 },
    };
  }
  
/**
 * select spetcific room
 *
 * @param roomIndex:number
 * @return {dispatch} Type + payload.
 */
 export function selectRoom(roomIndex) {
   return {
      type: "SELECT_ROOM",
      payload: roomIndex
    };
  }