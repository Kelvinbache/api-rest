const z = require("zod");

const userSchema = z.object({
  title: z.string({
    invalid_type_error: "tenemos un  error en el titulo",
    required_error: "error en la url",
  }),

  body: z.string({
    invalid_type_error: "texto invalido",
    required_error: "el texto no se puede leer",
  }),

  userId: z.number().int(),
});

function validateUse(object) {
  return userSchema.safeParse(object);
}

function validateParcialUser(object) {
  return userSchema.partial().safeParse(object);
}

module.exports = {
  validateUse,
  validateParcialUser,
};
