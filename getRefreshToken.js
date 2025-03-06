const { google } = require("googleapis");

require("dotenv").config();

const client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI, // Permite al usuario seleccionar el cuenta de Google a usar
);

const getAuthURL = async () => {
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive.file"],
  });
  console.log("🔗 Autoriza la app visitando este enlace:", authUrl);
};

const getRefreshToken = async (code) => {
  const { tokens } = await client.getToken(code);
  console.log("🆕 Nuevo Refresh Token:", tokens.refresh_token);
};

// Si pasas un código, obtiene el token de actualización
const code = process.argv[2];
if (code) {
  getRefreshToken(code);
} else {
  getAuthURL();
}
