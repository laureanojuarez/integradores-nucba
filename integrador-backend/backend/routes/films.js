import { createFilm, getFilms } from "../controllers/films";

const router = express.Router();

router.get("/", getFilms);
router.post("/", createFilm);

export default router;
