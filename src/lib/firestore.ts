import { doc, setDoc, getDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Movie } from "../../typings";

// ✅ Save a movie, but store `id` as a string in Firestore
export async function saveMovie(userId: string, movie: Movie) {
  await setDoc(doc(db, "users", userId, "favorites", String(movie.id)), {
    ...movie,
    id: String(movie.id), // ✅ Store as string
  });
}

// ✅ Remove a movie
export async function removeMovie(userId: string, movieId: string) {
  await deleteDoc(doc(db, "users", userId, "favorites", String(movieId)));
}

// ✅ Check if a movie is saved
export async function isMovieSaved(userId: string, movieId: string): Promise<boolean> {
  const docSnap = await getDoc(doc(db, "users", userId, "favorites", String(movieId)));
  return docSnap.exists();
}

// ✅ Get all saved movies and convert `id` to number
export async function getSavedMovies(userId: string): Promise<Movie[]> {
  const snapshot = await getDocs(collection(db, "users", userId, "favorites"));

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Movie, "id"> & { id: string }; // ✅ Ensure `id` is stored as a string
    return {
      ...data,
      id: Number(data.id), // ✅ Convert `id` back to number
    };
  });
}