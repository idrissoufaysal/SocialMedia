import jwt from "jsonwebtoken"

const authenticateUser =async (req, res, next) => {
    console.log('Middleware: authenticateUser');
  
   // const token = req.cookies.accessToken;
    const token = req.headers.authorization?.split(' ')[1]; // Extraction du token du format "Bearer TOKEN"

    if (!token) {
      console.log('Token non trouvé');
      return res.status(401).json({ error: "Not logged in!" });
    }

    console.log(req.headers.authorization);
  
   jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) {
            console.log('Erreur de vérification du token +', err);
            return res.status(483).json({ error: "Token is not valid!" });
        }

        console.log('Token vérifié avec succès');
        req.userInfo = userInfo; // Ajoute les informations de l'utilisateur à l'objet de requête
        next(); // Passe à la suite du traitement
    });
  };
 export default authenticateUser  