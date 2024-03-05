import { body, validationResult } from "express-validator";

// Middleware for signup validation
export const validateSignup = [
    body("nome").not().isEmpty().withMessage("O nome é obrigatório"),
    body("email").isEmail().withMessage("Insira um e-mail válido"),
    body("senha").not().isEmpty().withMessage("A senha é obrigatória"),
    body("telefones")
        .isArray({ min: 1 })
        .withMessage("Telefones devem ser um array com pelo menos um telefone"),
    body("telefones.*.numero")
        .not()
        .isEmpty()
        .withMessage("O número do telefone é obrigatório"),
    body("telefones.*.ddd")
        .not()
        .isEmpty()
        .withMessage("O DDD do telefone é obrigatório"),
    (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }
        next();
    },
];

// Middleware for sign in validation
export const validateSignin = [
    body("email").isEmail().withMessage("Insira um e-mail válido"),
    body("senha").not().isEmpty().withMessage("A senha é obrigatória"),
    (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }
        next();
    },
];
