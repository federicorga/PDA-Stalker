//este archivo nos permite renderizar nuestras vistas con los datos que tengamos
//permitira renderizar el formulario para nuestro chat

import { Router } from "express";

const router = Router();

router.get('/pda-chat', (req, res)=>{
    res.render('chatPda');
});

router.get('/index', (req, res)=>{
    res.render('index');
});

export default router
