const users = [];

/**
 * Add new user to the room room
 * @param id:string
 * @param userName:string
 * @param roomName:object
 * @return {User} user 
 */
const addUser = ({id, name, room})=>{
  name=name.trim().toLowerCase();
  room=room.trim().toLowerCase();

  const existingUserCheck = users.find((user)=>user.room === room && user.name === name);
  if(existingUserCheck){
    return {error:'Username is already taken'};
  }

  const user = {id, name, room};
  users.push(user);

  return {user};
}

/**
 * Remove exist user to the room room
 * @param id:string
 * @return {Users} user 
 */
const removeUser = (id)=>{
  const index = users.findIndex((user)=>user.id===id);
  if(index !== -1){
    return users.splice(index,1)[0];
  }
}

/**
 * Get user by id
 * @param id:string
 * @return {User} user 
 */
const getUser = (id)=>{
  return users.find((user)=>user.id === id)
}

/**
 * Get all users of a spetcific room
 * @param room:string
 * @return {Users} user 
 */
const getUsersOfRoom = (room)=> users.filter((user)=>user.room === room);

module.exports = {addUser, removeUser, getUser, getUsersOfRoom};
