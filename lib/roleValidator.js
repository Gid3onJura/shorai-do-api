// Erlaubte Rollen aus Environment Variable laden
const getAllowedRoles = () => {
  const rolesEnv = process.env.ALLOWED_ROLES
  return rolesEnv.split(",").map((role) => role.trim())
}

// Überprüfen ob Rollen erlaubt sind
const validateRoles = (roles) => {
  if (!roles) return { valid: true, roles: [] }
  if (!Array.isArray(roles)) return { valid: false, message: "Rollen müssen ein Array sein" }

  const allowedRoles = getAllowedRoles()
  const invalidRoles = roles.filter((role) => !allowedRoles.includes(role))

  if (invalidRoles.length > 0) {
    return {
      valid: false,
      message: `Ungültige Rollen: ${invalidRoles.join(", ")}`,
    }
  }

  return { valid: true, roles }
}

module.exports = {
  getAllowedRoles,
  validateRoles,
}
