import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';

export const login = async (req, res) => {
    const {count, rows} = await User.findAndCountAll({ where: { username: req.body.username } })

    if(count > 0){
        const match = await bcrypt.compare(req.body.password, rows[0].password)

        if(match) { // jika password benar
            // daftarkan token
            const payload = { username: rows[0].username }
            const token = jwt.sign(payload, process.env.TOKEN_JWT, {expiresIn: '1day'});

            return res.status(200).json({
                username: rows[0].username,
                role: rows[0].role,
                id: rows[0].id,
                prodiAdmin: rows[0].prodiAdmin,
                success: true,
                token: token
            })
        }else{
            return res.status(500).json({
                success: false,
                message: 'Password salah'
            })
        }
    }else{
        return res.status(500).json({message: 'Username salah', success: false})
    }
}

export const loggedIn = async (req, res) => {
    const username = res.locals.jwt.username;

    try{
        const result = await User.findOne({ where: { username: username } })

        return res.status(200).json({
            id: result.id,
            fullname: result.fullname,
            username: result.username,
            email: result.email,
            noHp: result.noHp,
            prodiAdmin: result.prodiAdmin,
            role: result.role,
            loggedIn: true
        })
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
}