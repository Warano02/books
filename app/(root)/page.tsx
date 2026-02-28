
import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import { getAllBooks } from "@/lib/actions/book.action";
import { sampleBooks } from "@/lib/constants";

async function page() {
  const booksResult = await getAllBooks()
  const books = booksResult.data || []
  return (
    <main className="wrapper container">
      <HeroSection />
      <div className="library-books-grid">
        {
          books.map((book) => <BookCard key={book._id} title={book.title} author={book.author} coverURL={book.coverURL} slug={book.slug} />)
        }
      </div>
    </main>
  );
}

export default page