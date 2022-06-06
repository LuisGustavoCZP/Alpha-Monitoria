const yup = require('yup')

const schemaCreate = yup.object().shape({
  name: yup
    .string('Este campo deve ser uma string')
    .required('Este campo é obrigatório')
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Este campo deve ser um nome válido!')
    .max(80, 'Nome deve ter no máximo 80 caracteres'),
  email: yup
    .string('Este campo deve ser uma string')
    .required('Este campo é obrigatório')
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Este campo deve ser um email válido!')
    .max(340, 'Email deve ter no máximo 340 caracteres'),
  birth_date: yup.string('Este campo deve ser uma string')
    .required('Este campo é obrigatório')
    .matches(/^\d\d\d\d-\d\d-\d\d$/, 'Data inválida, Formato da data aaaa-mm-dd'),
  image: yup.string('Este campo deve ser uma string'),
  password: yup
    .string('Este campo deve ser uma string')
    .required('Este campo é obrigatório')
    .trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'A senha deve ter no mínimo 8 caracteres e pelo menos 1 número') // Deve ter de 6 a 20 caracteres (formado por letras e números) com no mínimo 1 maiúscula, 1 minúscula e 1 número
})

const schemaUpdate = yup.object().shape({
  name: yup
    .string('Este campo deve ser uma string')
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Este campo deve ser um nome válido!')
    .max(80, 'Nome deve ter no máximo 80 caracteres'),
  email: yup
    .string('Este campo deve ser uma string')
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Este campo deve ser um email válido!')
    .max(340, 'Email deve ter no máximo 340 caracteres'),
  birth_date: yup
    .string('Este campo deve ser uma string')
    .matches(/^\d\d\d\d-\d\d-\d\d$/, 'Data inválida, Formato da data aaaa-mm-dd'),
  image: yup.string('Este campo deve ser uma string'),
  password: yup
    .string('Este campo deve ser uma string')
    .trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'A senha deve ter no mínimo 8 caracteres e pelo menos 1 número')
})

const schemaLogin = yup.object().shape({
  email: yup
    .string('Este campo deve ser uma string')
    .required('Este campo é obrigatório')
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Este campo deve ser um email válido!')
    .max(340, 'Email deve ter no máximo 340 caracteres'),
  password: yup
    .string('Este campo deve ser uma string')
    .trim()
    .required('Este campo é obrigatório')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'A senha deve ter no mínimo 8 caracteres e pelo menos 1 número')
})

const validateCreate = async (req, res, next) => {
  try {
    const image = req.body.image
    const bodyValidate = await schemaCreate.validate(req.body)
    req.body = bodyValidate
    req.body.image = image
    console.log('anderson risadinha', bodyValidate)
    next()
  } catch (e) {
    res.status(400).send(e.errors.join(','))
  }
}

const validateUpdate = async (req, res, next) => {
  try {
    const image = req.body.image
    const bodyValidate = await schemaUpdate.validate(req.body)
    req.body = bodyValidate
    req.body.image = image
    next()
  } catch (e) {
    res.status(400).send(e.errors.join(','))
  }
}

const validateLogin = async (req, res, next) => {
  try {
    const bodyValidate = await schemaLogin.validate(req.body)
    req.body = bodyValidate
    next()
  } catch (e) {
    res.status(400).send(e.errors.join(','))
  }
}

module.exports = { validateCreate, validateUpdate, validateLogin }
