
import bcrypt from 'bcrypt';


export const register = (req, res) => {
    const {username, email, password, confirmPassword} = req.body

    if (!username) {
        return res.status(422).json({msg: "O nome é obrigatório!"})
    }
    if (!email) {
        return res.status(422).json({msg: "O email é obrigatório!"})
    }
    if (!password) {
        return res.status(422).json({msg: "A senha é obrigatório!"})
    }
    if (password /= confirmPassword) {
        return res.status(422).json({msg: "As senhas não são iguais!"})
    }

    db.query("SELECT email FROM user WHERE email = ?" [email], async(error, data) => {
        if (error) {
            console.log(error)
            return res.status(500).json({msg:"Aconteceu algum erro no servidor! Tente novamente mais tarde!"})
        }
        if (data.length > 0) {
            return res.status(500).json({msg: "Este email ja está sendo utilizado"})
        } else {
            const passwordHash = await bcrypt.hash(password, 8)
            db.query(
                "INSERT INTO user SET ?", {username, email, password:passwordHash},
                (error) => {
                    if(error) {
                        console.log(error)
                        return res.status(500).json({msg:"Aconteceu algum erro no servidor! Tente novamente mais tarde!"})
                    } else {
                        return res.status(200).json({msg:"Cadastro efetuado com sucesso"})
                    }
                }
            )
        }
    })
}
export const login = (req,res) => {

}