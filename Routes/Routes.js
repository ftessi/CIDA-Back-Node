import express from 'express';
import { AddPublication, GetAllPublications, EditPublication, GetLastPublications, GetPublicationById } from "../Controllers/Publications.js";
import { Login, Logout, Register } from '../Controllers/Authentication.js';
import { verifyToken } from '../Controllers/VerifyToken.js';
import { refreshToken } from '../Controllers/RefreshToken.js';
import pool from '../Config/db.js';


const router = express.Router();

router.get('/publicaciones', GetAllPublications);
router.get('/PublicationById/:id', verifyToken, GetPublicationById);
router.post('/AddPublicacion', AddPublication);
router.post('/EditPublicacion', verifyToken, EditPublication)
router.get('/novedades', GetLastPublications);
router.get('/token', refreshToken)
router.post('/login', Login)
router.post('/register', Register)
router.delete('/logout', Logout)
router.get('/search', async (req, res) => {
    const { search } = req.query;

    try {
        // Assuming you have a 'products' table in the database
        // Replace 'your_column_name' with the actual column name in your 'products' table
        const query = `SELECT * FROM products WHERE descripcion ILIKE $1`; // ILIKE for case-insensitive search

        // Use the pool to execute the query
        const { rows } = await pool.query(query, [`%${search}%`]);

        res.json(rows); // Return the search results as JSON
    } catch (error) {
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;