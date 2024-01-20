const users = [];


const addUser = (id, username, roomId, host, presenter) => {
  const user = { id, username, roomId, host, presenter };

  users.push(user);
  return users.filter((user) => user.roomId === roomId);
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};


const getUser = (id) => {
    return users.find((user) => user.userId === id)
}

const getUsersInRoom = (roomId) => {
    return users.filter((user) => user.roomId === roomId)
}

module.exports={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}