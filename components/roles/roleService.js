import { findAllRole } from "./roleRepository.js";

export async function getAllRoles(){
  return await findAllRole();
}