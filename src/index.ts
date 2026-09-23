import app from "./app.js";

try {
    process.loadEnvFile();
} catch (err) {
    //there will be no .env for prod
}

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log("Server is listening to port ", PORT);
});