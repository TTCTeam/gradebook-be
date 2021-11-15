import Role from "./roleModel.js";

export async function findAllRole(){
  return Role.findAll();
}