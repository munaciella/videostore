type Props = {
    params: { id: string };
    searchParams: {
        genre: string;
    }
}

const GenrePage = ({ params: { id }, searchParams: { genre } }: Props) => {
    const  decodedGenre = decodeURIComponent(genre);

  return (
    <div>Welcome to the genre with ID: {id} and name: {decodedGenre}</div>
  )
}

export default GenrePage