import { doc, setDoc, getDoc, deleteDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Movie } from "../../typings";

export async function saveMovie(userId: string, movie: Movie) {
  await setDoc(doc(db, "users", userId, "favorites", String(movie.id)), {
    ...movie,
    id: String(movie.id), 
    watched: false,
  });
}

export async function toggleWatchStatus(userId: string, movieId: string, watched: boolean) {
  await updateDoc(doc(db, "users", userId, "favorites", String(movieId)), {
    watched,
  });
}

export async function getWatchStatus(userId: string, movieId: string): Promise<boolean | null> {
  const docSnap = await getDoc(doc(db, "users", userId, "favorites", String(movieId)));
  if (docSnap.exists()) {
    return docSnap.data().watched ?? false;
  }
  return null;
}

export async function removeMovie(userId: string, movieId: string) {
  await deleteDoc(doc(db, "users", userId, "favorites", String(movieId)));
}

export async function isMovieSaved(userId: string, movieId: string): Promise<boolean> {
  const docSnap = await getDoc(doc(db, "users", userId, "favorites", String(movieId)));
  return docSnap.exists();
}

export async function getSavedMovies(userId: string): Promise<Movie[]> {
  const snapshot = await getDocs(collection(db, "users", userId, "favorites"));

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Movie, "id"> & { id: string };
    return {
      ...data,
      id: Number(data.id),
    };
  });
}
